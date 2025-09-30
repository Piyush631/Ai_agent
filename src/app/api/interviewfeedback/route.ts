import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const{username,email,feedback,interviewId}=body;
  const response = await prisma.feedback.create({
    data: {
      username,
      email,
      feedback,
      interviewId,
    },
  });
  return NextResponse.json(response);
}