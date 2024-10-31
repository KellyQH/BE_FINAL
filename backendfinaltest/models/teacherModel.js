// teacherSchema in models/teacherModel.js
import mongoose from "mongoose";

const degreeSchema = new mongoose.Schema(
  {
    type: String,
    school: String,
    major: String,
    year: Number,
    isGraduated: Boolean,
  },
  { _id: false }
);

const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: Boolean,
    isDeleted: Boolean,
    code: { type: String, unique: true },
    startDate: Date,
    endDate: Date,
    teacherPositions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "TeacherPosition" },
    ],
    degrees: [degreeSchema],
  },
  { timestamps: true }
);

const TeacherModel = mongoose.model("Teacher", teacherSchema);
export default TeacherModel;
