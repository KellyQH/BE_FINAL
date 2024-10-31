import mongoose from "mongoose";

const teacherPositionSchema = new mongoose.Schema({
  name: String,
  code: { type: String, unique: true },
  des: String,
  isActive: Boolean,
  isDeleted: Boolean,
});

const TeacherPositionModel = mongoose.model("TeacherPosition", teacherPositionSchema);
export default TeacherPositionModel;
