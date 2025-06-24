import bcrypt from "bcrypt";
import UserModel from "app/models/User.model";
import { connectDB } from "app/config/db";

export async function registerUser({
  fullName,
  phoneNumber,
  email,
  dateOfBirth,
  password,
}) {
  try {
    await connectDB();

    // Check if user exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return { message: "Email already registered", status: 400 };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new UserModel({
      fullName,
      phoneNumber,
      email,
      dateOfBirth: new Date(dateOfBirth),
      password: hashedPassword,
    });

    await user.save();
    return { message: "User registered successfully", status: 201 };
  } catch (error) {
    console.error("Controller error:", error);
    return { message: "Server error", status: 500 };
  }
}
