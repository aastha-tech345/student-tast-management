import { connectDB } from "app/config/db";

export async function createRecord(Model, data) {
  await connectDB();
  
  const existingRecord = await Model.findOne({ $or: [{ email: data.email }, { userId: data.userId }] });
  if (existingRecord) {
    throw Object.assign(new Error(existingRecord.email === data.email ? "Email already registered" : "User ID already registered"), { status: 400 });
  }

  const record = new Model(data);
  await record.save();
  return record;
}