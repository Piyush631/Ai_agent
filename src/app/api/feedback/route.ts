import { FEEDBACK_PROMPT } from "@/app/utils/constant";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  const { conversation } = await req.json();
  const FINAL_PROMPT = FEEDBACK_PROMPT.replace(
    "{{conversation}}",
    conversation
  );
  try {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: [
        {
          role: "user",
          content: FINAL_PROMPT,
        },
      ],
    });

    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate questions",
      },
      { status: 500 }
    );
  }
}
