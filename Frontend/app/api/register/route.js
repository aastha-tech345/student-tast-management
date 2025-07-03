import bcrypt from "bcrypt";
import UserModel from "app/models/User.model";
import { connectDB } from "app/config/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { fullName, phoneNumber, email, dateOfBirth, password } = await request.json();

    await connectDB();

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already registered" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      fullName,
      phoneNumber,
      email,
      dateOfBirth: new Date(dateOfBirth),
      password: hashedPassword,
    });

    await user.save();

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
    
  } catch (error) {
    console.error("Route error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
