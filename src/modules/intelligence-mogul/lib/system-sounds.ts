/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Synthesized UI audio cues for the Intelligence Mogul module.
 * Extracted unchanged from the standalone application shell (App.tsx);
 * browser-only — call from client components.
 */

type AudioContextConstructor = typeof AudioContext;

function getAudioContextClass(): AudioContextConstructor | undefined {
  if (typeof window === "undefined") return undefined;
  return (
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: AudioContextConstructor }).webkitAudioContext
  );
}

/**
 * Synthesizes a high-fidelity 'ping' chime sound using the browser's Web Audio API.
 * Uses dual-oscillators (fundamental frequency + higher harmonic chime overlay)
 * with rapid linear rise attack and smooth exponential decays to craft a premium tech aesthetic.
 */
export function playPingSound(isMuted?: boolean) {
  if (isMuted) return;
  try {
    const AudioContextClass = getAudioContextClass();
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    // Primary pure tone (880Hz / A5 - futuristic fundamental frequency)
    const osc1 = ctx.createOscillator();
    // High-pitched crystalline harmonic (1760Hz / A6 - metallic chime character)
    const osc2 = ctx.createOscillator();

    // Gain channels for precise audio envelope shaping
    const gain1 = ctx.createGain();
    const gain2 = ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(880, ctx.currentTime);
    // Smooth slight pitch-glide typical of high-end consumer UI feedback
    osc1.frequency.exponentialRampToValueAtTime(523.25, ctx.currentTime + 0.35); // Glide from A5 down to C5

    osc2.type = "sine";
    osc2.frequency.setValueAtTime(1760, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.18); // One octave above

    // Connect nodes
    osc1.connect(gain1);
    osc2.connect(gain2);

    gain1.connect(ctx.destination);
    gain2.connect(ctx.destination);

    // Envelope for main warm tone: fast attack, organic exponential release
    gain1.gain.setValueAtTime(0.0, ctx.currentTime);
    gain1.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.015);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

    // Envelope for crisp harmonic overlay: near-instant chime, short shimmer decay
    gain2.gain.setValueAtTime(0.0, ctx.currentTime);
    gain2.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.01);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

    // Activate synthesis
    osc1.start(ctx.currentTime);
    osc2.start(ctx.currentTime);

    // Clean memory of active audio streams
    osc1.stop(ctx.currentTime + 0.55);
    osc2.stop(ctx.currentTime + 0.25);
  } catch (err) {
    console.warn("Synthesized audio cue blocked or not supported by browser environment: ", err);
  }
}

/**
 * Synthesizes a low-frequency 'aborted' warning tone using the browser's Web Audio API.
 * Uses dual-oscillators (triangle drop + sawtooth growl) with quick release envelope
 * to create a distinct, high-fidelity mechanical cancel sound signature.
 */
export function playAbortedSound(isMuted?: boolean) {
  if (isMuted) return;
  try {
    const AudioContextClass = getAudioContextClass();
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    // Low frequency dropping warning fundamental (180Hz down to 110Hz)
    const osc = ctx.createOscillator();
    // Sub frequency growl harmonic (90Hz down to 60Hz)
    const subOsc = ctx.createOscillator();

    const gainNode = ctx.createGain();
    const subGainNode = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(180, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.3);

    subOsc.type = "sawtooth";
    subOsc.frequency.setValueAtTime(90, ctx.currentTime);
    subOsc.frequency.linearRampToValueAtTime(60, ctx.currentTime + 0.25);

    osc.connect(gainNode);
    subOsc.connect(subGainNode);
    gainNode.connect(ctx.destination);
    subGainNode.connect(ctx.destination);

    // Fast attack, swift industrial decay
    gainNode.gain.setValueAtTime(0.0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.015);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    subGainNode.gain.setValueAtTime(0.0, ctx.currentTime);
    subGainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.01);
    subGainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    osc.start(ctx.currentTime);
    subOsc.start(ctx.currentTime);

    osc.stop(ctx.currentTime + 0.4);
    subOsc.stop(ctx.currentTime + 0.3);
  } catch (err) {
    console.warn("Synthesized abort audio blocked or not supported: ", err);
  }
}
