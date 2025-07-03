import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    className: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isActive: { type: String, default: "true" },
    isDeleted: { type: String, default: "false" },
  },
  { timestamps: true },
);

export default mongoose.models.Student ||
  mongoose.model("Student", studentSchema);
