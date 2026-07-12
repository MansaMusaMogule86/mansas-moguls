import { NextRequest, NextResponse } from "next/server";
import { openRouterChat } from "@/lib/openrouter";

export async function POST(req: NextRequest) {
  try {
    const { messages, model, temperature, maxTokens } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid or missing 'messages' array in request body." },
        { status: 400 }
      );
    }

    const result = await openRouterChat({
      messages,
      model,
      temperature,
      maxTokens,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("OpenRouter API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process chat completion request." },
      { status: 500 }
    );
  }
}
