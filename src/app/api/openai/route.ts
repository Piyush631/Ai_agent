import { PROMPT } from "@/app/utils/constant";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const { jobposition, jobdescription, duration, interviewType } =
      await req.json();

    console.log("Processing request for position:", jobposition);

    const FinalPrompt = PROMPT.replace("{{jobTitle}}", jobposition)
      .replace("{{jobDescription}}", jobdescription)
      .replace("{{duration}}", duration)
      .replace("{{ftype}}", interviewType);
    console.log(FinalPrompt);
    
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    // Retry logic for rate limiting
    let retries = 3;
    let lastError;
    
    while (retries > 0) {
      try {
        const completion = await openai.chat.completions.create({
          model:"deepseek/deepseek-chat-v3.1:free",
          messages: [
            {
              role: "user",
              content: FinalPrompt,
            },
          ],
          max_tokens: 2000,
          temperature: 0.7,
        });
        
        console.log("completionbypiyush");
        console.log(completion.choices[0].message);
        return NextResponse.json(completion.choices[0].message);
      } catch (error: any) {
        lastError = error;
        
        // Check if it's a rate limit error
        if (error.status === 429 || error.code === 429) {
          console.log(`Rate limit hit, retrying in ${(4 - retries) * 2} seconds...`);
          await new Promise(resolve => setTimeout(resolve, (4 - retries) * 2000));
          retries--;
        } else {
          // For other errors, don't retry
          throw error;
        }
      }
    }
    
    // If all retries failed
    throw lastError;
    
  } catch (error: any) {
    console.error("API Error:", error);
    
    // Return more specific error messages
    if (error.status === 429 || error.code === 429) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded. Please try again in a few minutes.",
          details: "The AI service is currently busy. Please wait and try again."
        },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate questions",
        details: error.message || "Unknown error occurred"
      },
      { status: 500 }
    );
  }
}
