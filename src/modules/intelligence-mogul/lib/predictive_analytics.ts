/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PredictionResult {
  metricKey: string;
  metricName: string;
  historicalValues: number[];
  projectedValues: number[]; // 3 points: +5m, +10m, +15m
  predictedValue: number;    // at +15m
  slope: number;             // calculated trend slope
  confidenceInterval: {
    lower: number;
    upper: number;
  };
  hasBreached: boolean;      // If predictive breach occurs
  breachType: "upper" | "lower" | "volatility" | "none";
  confidenceScore: number;   // Confidence percentage (e.g., 94.2%)
  severity: "high" | "medium" | "low";
  timestamp: string;         // Forecasted breach time
  recommendedAction: string;
}

/**
 * Fits a Linear Regression model to forecast future states.
 */
function fitLinearRegression(y: number[], stepsAhead: number): { value: number; slope: number; error: number } {
  const n = y.length;
  if (n < 2) return { value: y[0] || 50, slope: 0, error: 5 };

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;

  for (let i = 0; i < n; i++) {
    sumX += i;
    sumY += y[i];
    sumXY += i * y[i];
    sumXX += i * i;
  }

  const denominator = n * sumXX - sumX * sumX;
  const slope = denominator === 0 ? 0 : (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;

  // Predict at stepsAhead ticks from the last tick (index n - 1)
  const targetIndex = (n - 1) + stepsAhead;
  const predicted = Math.round(slope * targetIndex + intercept);

  // Simple variance calculation for standard error
  let residualsSqSum = 0;
  for (let i = 0; i < n; i++) {
    const fitted = slope * i + intercept;
    residualsSqSum += Math.pow(y[i] - fitted, 2);
  }
  const variance = residualsSqSum / (n - 1 || 1);
  const error = Math.sqrt(variance);

  return { 
    value: Math.max(0, Math.min(100, predicted)), 
    slope, 
    error: Math.max(1.5, error) 
  };
}

/**
 * Fits a Holt's Double Exponential Smoothing model (models level and trend).
 */
function fitExponentialSmoothing(y: number[], stepsAhead: number, alpha = 0.5, beta = 0.4): { value: number; slope: number; error: number } {
  const n = y.length;
  if (n < 2) return { value: y[0] || 50, slope: 0, error: 5 };

  let level = y[0];
  let trend = y[1] - y[0];

  for (let i = 1; i < n; i++) {
    const prevLevel = level;
    level = alpha * y[i] + (1 - alpha) * (level + trend);
    trend = beta * (level - prevLevel) + (1 - beta) * trend;
  }

  // Forecast standard target
  const predicted = Math.round(level + stepsAhead * trend);
  
  // Calculate variance of deviations
  let diffSum = 0;
  for (let i = 1; i < n; i++) {
    diffSum += Math.abs(y[i] - y[i - 1]);
  }
  const avgAbsDiff = diffSum / (n - 1 || 1);

  return {
    value: Math.max(0, Math.min(100, predicted)),
    slope: trend,
    error: Math.max(2, avgAbsDiff * 1.2)
  };
}

/**
 * Unified Prediction Engine
 */
export function analyzeMetricPredictiveTrend(
  metricKey: string,
  metricName: string,
  history: number[],
  modelType: "regression" | "exponential" | "bayesian",
  upperThreshold: number,
  lowerThreshold: number,
  volatilityThreshold: number,
  confidenceIntervalInput: number // 80 | 95 | 99
): PredictionResult {
  // Projections for +5m (+1 step), +10m (+2 steps), +15m (+3 steps)
  const projectedValues: number[] = [];
  let finalPredictiveVal = 50;
  let slopeTrend = 0;
  let predictionError = 3;

  for (let k = 1; k <= 3; k++) {
    let result;
    if (modelType === "exponential") {
      result = fitExponentialSmoothing(history, k, 0.45, 0.35);
    } else if (modelType === "bayesian") {
      // Bayesian Mean Reverting blend
      const reg = fitLinearRegression(history, k);
      const mean = history.reduce((a, b) => a + b, 0) / history.length;
      // Pull heavily back to historical mean representing a structural system anchor (reversion factor)
      const blendFactor = 0.35; 
      const blendedVal = Math.round(reg.value * (1 - blendFactor) + mean * blendFactor);
      result = { value: blendedVal, slope: reg.slope * (1 - blendFactor), error: reg.error * 1.1 };
    } else {
      // Standard linear regression
      result = fitLinearRegression(history, k);
    }

    projectedValues.push(result.value);
    if (k === 3) {
      finalPredictiveVal = result.value;
      slopeTrend = result.slope;
      predictionError = result.error;
    }
  }

  // Adjust error based on confidence interval scale setting
  // t-score approximations
  let multiplier = 1.28; // 80% CI
  if (confidenceIntervalInput === 95) {
    multiplier = 1.96;
  } else if (confidenceIntervalInput === 99) {
    multiplier = 2.58;
  }

  const marginOfError = predictionError * multiplier;
  const lowerBound = Math.max(0, Math.min(100, Math.round(finalPredictiveVal - marginOfError)));
  const upperBound = Math.max(0, Math.min(100, Math.round(finalPredictiveVal + marginOfError)));

  // Identify potential breach in the 15-minute future window
  let breachType: "upper" | "lower" | "volatility" | "none" = "none";
  let hasBreached = false;
  let severity: "high" | "medium" | "low" = "low";
  let recommendedAction = "";

  const currentVal = history[history.length - 1];
  const deltaShift = Math.abs(finalPredictiveVal - currentVal);

  if (finalPredictiveVal >= upperThreshold) {
    breachType = "upper";
    hasBreached = true;
    severity = finalPredictiveVal >= upperThreshold + 5 ? "high" : "medium";
    recommendedAction = `System over-saturation predicted. Scale down active compiler threads or deploy auxiliary load balancers.`;
  } else if (finalPredictiveVal <= lowerThreshold) {
    breachType = "lower";
    hasBreached = true;
    severity = finalPredictiveVal <= lowerThreshold - 5 ? "high" : "medium";
    recommendedAction = `Resource deficit predicted. Immediately trigger stabilization shunts, initiate warm standby node sync state.`;
  } else if (deltaShift >= volatilityThreshold) {
    breachType = "volatility";
    hasBreached = true;
    severity = "medium";
    recommendedAction = `Sharp trend variance predicted (+15m Delta: ${deltaShift.toFixed(1)}%). Establish safe boundary lock options.`;
  }

  // Estimate a realistic ML Confidence Score
  const R_sq = Math.max(0, Math.min(0.98, nFormulaMetricAccuracy(history, slopeTrend)));
  const confidenceScore = Math.round((R_sq * 40 + (1 - predictionError / 35) * 60) * 10) / 10;

  // Estimated future execution minute (User local time + 15 mins)
  const futureTime = new Date(Date.now() + 15 * 60 * 1000);
  const formattedFutureTime = futureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return {
    metricKey,
    metricName,
    historicalValues: history,
    projectedValues,
    predictedValue: finalPredictiveVal,
    slope: slopeTrend,
    confidenceInterval: {
      lower: lowerBound,
      upper: upperBound
    },
    hasBreached,
    breachType,
    confidenceScore: Math.min(99.4, Math.max(68.2, confidenceScore)),
    severity,
    timestamp: formattedFutureTime,
    recommendedAction
  };
}

/**
 * Computes a pseudo coefficient of determination (R^2) representing accuracy.
 */
function nFormulaMetricAccuracy(y: number[], slope: number): number {
  if (y.length < 3) return 0.55;
  const n = y.length;
  // Calculate variance of metric history vs slope direction
  let consistentCount = 0;
  for (let i = 1; i < n; i++) {
    const diff = y[i] - y[i - 1];
    if ((slope > 0 && diff >= 0) || (slope < 0 && diff <= 0) || (slope === 0 && Math.abs(diff) <= 1)) {
      consistentCount++;
    }
  }
  return consistentCount / (n - 1);
}
