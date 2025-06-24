import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "app/models/User.model";
import { connectDB } from "app/config/db";

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key", 
      { expiresIn: "1h" },
    );

    // Set token in cookie
    const response = NextResponse.json(
      { message: "Login successful", token },
      { status: 200 },
    );
    response.cookies.set("authToken", token, {
      httpOnly: true, // Prevents client-side JS access
      secure: process.env.NODE_ENV === "production", // Use secure in production
      sameSite: "strict", // Protects against CSRF
      maxAge: 3600, // 1 hour in seconds
      path: "/", // Accessible across the app
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
