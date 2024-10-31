import UserModel from "../models/userModel.js";
import TeacherModel from "../models/teacherModel.js";
import TeacherPositionModel from "../models/teacherPosition.js";
import mongoose from "mongoose";

//1.1 Trả ra danh sách toàn bộ thông tin giáo viên bao gồm: code (Mã GV), tên, email, sđt, trạng thái hoạt động, địa chỉ, vị trí công tác, học vấn (trình độ, trường theo học)
//1.2 Thực hiện phân trang với các giá trị query: page - trang muốn lấy thông tin, limit - giới hạn số lượng thông tin trên một trang
//GET: /teachers
const getAllTeachers = async (req, res) => {
  const { page } = req.params;
  const teacherPerPage = 5;

  try {
    const totalTeachers = await TeacherModel.countDocuments();
    const totalPages = Math.ceil(totalTeachers / teacherPerPage);
    const skip = (page - 1) * teacherPerPage;

    const teachers = await TeacherModel.find()
      .skip(skip)
      .limit(teacherPerPage)
      .sort({ startDate: -1 })
      .populate("userId", "name email phoneNumber address")
      .populate("teacherPositions", "name code")
      .select("code isActive degrees");

    return res.json({ teachers, totalPages });
  } catch (error) {
    res.status(500).json({ error: "Error fetching teachers" });
  }
};

//1.3 Thực hiện tạo thông tin của 1 giáo viên. Lưu ý: code cần sinh ra chuỗi số ngẫu nhiên, không được phép trùng, email là duy nhất
//POST: /teachers
const createTeacher = async (req, res) => {
  try {
    const { userId, startDate, endDate, teacherPositions, degrees } = req.body;

    // Generate unique code
    const code = Math.floor(1000000000 + Math.random() * 9000000000).toString();

    const teacher = new TeacherModel({
      userId,
      code,
      startDate,
      endDate,
      teacherPositions,
      degrees,
    });

    await teacher.save();
    res.status(201).json(teacher);
  } catch (error) { console.error(error); // Log the error
    res.status(500).json({ error: "Error creating teacher" });
  }
};

//GET: /teacher-positions
//1.4 Trả ra danh sách  toàn bộ thông tin của các vị trí công tác
const getAllTeacherPositions = async (req, res) => {
  try {
    const positions = await TeacherPositionModel.find();
    res.json(positions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching positions" });
  }
};

// POST: /teacher-positions
// 1.5 Tạo mới thông tin vị trí công tác, lưu ý: code - là duy nhất
const createTeacherPosition = async (req, res) => {
  try {
    const { name, code, des, isActive } = req.body;

    // Check if the code already exists
    const existingPosition = await TeacherPositionModel.findOne({ code });
    if (existingPosition) {
      return res.status(400).json({ error: "Position code must be unique" });
    }

    const position = new TeacherPositionModel({
      name,
      code,
      des,
      isActive,
    });

    await position.save();
    res.status(201).json(position);
  } catch (error) {
    res.status(500).json({ error: "Error creating teacher position" });
  }
};

export {
  getAllTeachers,
  createTeacher,
  getAllTeacherPositions,
  createTeacherPosition,
};
