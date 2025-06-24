import { registerUser } from "app/controllers/user.controller";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    const result = await registerUser(data);
    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    console.error("Route error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
