import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      jobposition,
      jobdescription,
      duration,
      interviewType,
      question,
      userId,
    } = body;
    if (
      !jobposition ||
      !jobdescription ||
      !duration ||
      !interviewType ||
      !question ||
      !userId
    ) {
      const missingFields = [];
      if (!jobposition) missingFields.push("jobposition");
      if (!jobdescription) missingFields.push("jobdescription");
      if (!duration) missingFields.push("duration");
      if (!interviewType) missingFields.push("interviewType");
      if (!question) missingFields.push("question");
      if (!userId) missingFields.push("userId");

      return NextResponse.json(
        {
          msg: "Missing required fields",
          missingFields,
        },
        { status: 400 }
      );
    }
    const newJobPost = await prisma.question.create({
      data: {
        jobposition,
        jobdescription,
        duration,
        interviewtype: interviewType,
        question,
        userId: Number(userId),
      },
    });

    return NextResponse.json(newJobPost, { status: 201 });
  } catch (error: any) {
    console.error("Error creating job post:", error);
    return NextResponse.json(
      {
        msg: "Server error while creating job post.",
        error: error?.message || "Unknown error",
        details: error,
      },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
     const response =await prisma.question.findMany();
     return NextResponse.json(response, { status: 200 });
    }
   catch (error) {
    return NextResponse.json({ msg: `faild to get interview details ${error}` }, { status: 402 });
  }
}