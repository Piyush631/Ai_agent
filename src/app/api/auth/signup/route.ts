import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password, email } = await req.json();

  if (!username || !password || !email) {
    return NextResponse.json({
      msg: "Invalid details",
    });
  }
}
