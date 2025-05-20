import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { jobposition, jobdescription, duration, interviewtype, question, userId } =
      await req.json();

    if (
      !jobposition ||
      !jobdescription ||
      !duration ||
      !interviewtype ||
      !question ||
      !userId
    ) {
      return NextResponse.json(
        { msg: "Field is missing. Send full data." },
        { status: 400 }
      );
    }

    console.log(jobposition, jobdescription, duration, interviewtype, question, userId);

    const newJobPost = await prisma.question.create({
      data: {
        jobposition,
        jobdescription,
        duration,
        interviewtype,
        question,
        userId,
      },
    });

    return NextResponse.json(newJobPost, { status: 201 });
  } catch (error) {
    console.error("Error creating job post:", error);
    return NextResponse.json(
      { msg: "Server error while creating job post." },
      { status: 500 }
    );
  }
}
