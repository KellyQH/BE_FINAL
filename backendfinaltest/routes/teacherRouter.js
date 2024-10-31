import { Router } from "express";
import {
  getAllTeachers,
  createTeacher,
  getAllTeacherPositions,
  createTeacherPosition,
} from "../controllers/teacherController.js";

const router = Router();

router.get("/getAllTeachers/:page", getAllTeachers);
router.post("/createNewTeachers", createTeacher);
router.get("/teacher-positions", getAllTeacherPositions);
router.post("/teacher-positions", createTeacherPosition);

export default router;
