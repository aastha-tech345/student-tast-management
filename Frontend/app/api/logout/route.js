import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ message: "Logged out" }, { status: 200 });
  response.cookies.set("authToken", "", {
    httpOnly: true,
    expires: new Date(0), // Clear cookie
    path: "/",
  });
  return response;
}