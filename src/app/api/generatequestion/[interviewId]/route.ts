import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ interviewId: string }> }
) {
  const params = await context.params;
  const interviewId = Number(params.interviewId);

  if (isNaN(interviewId)) {
    return NextResponse.json(
      { error: "Invalid interview ID" },
      { status: 400 }
    );
  }

  try {
    const response = await prisma.question.findUnique({
      where: { id: interviewId },
    });

    if (!response) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching question:", error);
    return NextResponse.json(
      {
        error: {
          name: error.name,
          message: error.message,
        },
      },
      { status: 500 }
    );
  }
}
