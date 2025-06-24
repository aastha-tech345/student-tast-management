import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date, required: true },
    password: { type: String, required: true },
    isActive: { type: String, default: "true" },
    isDeleted: { type: String, default: "false" },
  },
  { timestamps: true },
);
export default mongoose.models.User || mongoose.model("User", userSchema);
