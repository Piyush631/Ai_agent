import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: { interviewId: string } }
) {
  const interviewId = Number(context.params.interviewId);

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

    return NextResponse.json(response);
  } catch (error: any) {
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
