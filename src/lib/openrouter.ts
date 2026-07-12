export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatOptions {
  model?: string;
  messages: Message[];
  temperature?: number;
  maxTokens?: number;
}

/**
 * Reusable utility to call OpenRouter Chat Completion API.
 * Uses the API key defined in .env.local.
 */
export async function openRouterChat({
  model = "google/gemini-2.5-flash",
  messages,
  temperature = 0.7,
  maxTokens = 1000,
}: ChatOptions) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("Missing OPENROUTER_API_KEY in environment variables.");
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": "https://mansas-moguls.com", // Optional referer for OpenRouter
      "X-Title": "Mansas Moguls Control Center",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `OpenRouter API returned error status ${response.status}: ${
        errorData.error?.message || response.statusText
      }`
    );
  }

  const data = await response.json();
  return {
    content: data.choices?.[0]?.message?.content || "",
    usage: data.usage || null,
  };
}
