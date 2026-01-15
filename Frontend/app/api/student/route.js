import { NextResponse } from "next/server";
import { createRecord } from "app/untils/emailValidation";
import { validateStudent } from "app/untils/validation";
import studentModel from "app/models/student.model";

export async function POST(request) {
  try {
    const data = await request.json();
    await validateStudent(data, false);
    const student = await createRecord(studentModel, data);
    return NextResponse.json(
      { message: "Student registered successfully", data: student },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: error.status || 500 },
    );
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    await validateStudent(data, true);
    const student = await studentModel.findById(data.id);
    if (!student) {
      throw Object.assign(new Error("Student not found"), { status: 404 });
    }
    const existingStudent = await studentModel.findOne({
      $or: [{ email: data.email }, { userId: data.userId }],
      _id: { $ne: data.id },
    });
    if (existingStudent) {
      throw Object.assign(
        new Error(
          existingStudent.email === data.email
            ? "Email already registered by another student"
            : "User ID already registered by another student",
        ),
        { status: 400 },
      );
    }
    Object.assign(student, data);
    await student.save();
    return NextResponse.json(
      { message: "Student updated successfully", data: student },
      { status: 200 },
    );
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: error.status || 500 },
    );
  }
}
