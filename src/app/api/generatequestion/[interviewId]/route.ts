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
    const interview = await prisma.question.findUnique({
      where: { id: interviewId },
      select: {
        id: true,
        jobposition: true,
        jobdescription: true,
        duration: true,
        interviewtype: true,
        question: true
      }
    });

    if (!interview) {
      return NextResponse.json(
        { error: "Interview not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(interview);
  } catch (error: any) {
    console.error("Database error:", error);
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
