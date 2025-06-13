import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, feedback, interviewId } = body;
    if (!username || !email || !feedback || !interviewId) {
      return NextResponse.json(
        {
          msg: "some field is missing",
        },
        {
          status: 400,
        }
      );
    }
    const response = await prisma.feedback.create({
      data: {
        username,
        email,
        feedback,
        interviewId,
      },
    });
    return NextResponse.json(
      {
        msg: "feedback stored successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        msg: `faild to stored feeback ${error}`,
      },
      {
        status: 402,
      }
    );
  }
}
