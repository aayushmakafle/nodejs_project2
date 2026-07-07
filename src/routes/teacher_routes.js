import { Router } from "express";
import { CreateTeacher, CreateTeacherWithDepartment, DeleteTeacher, filterTeachers, FindAllTeachers, FindAllTeachersWithSelect, FindTeacherById, sortTeachers, UpdateTeacher } from "../handlers/teacher_handler.js";
import { authMiddleware } from "../middlewares/auth_middleware.js";
let router=Router()
router.get("/",authMiddleware, FindAllTeachers)
router.get("/single/:id",FindTeacherById)
router.get("/select",FindAllTeachersWithSelect)
router.get("/sort",sortTeachers)
router.get("/filter",filterTeachers)
router.post("/",authMiddleware,CreateTeacher)
router.post("/withDpart",CreateTeacherWithDepartment)
router.put("/:id",authMiddleware,UpdateTeacher)
router.delete("/:id",authMiddleware,DeleteTeacher)
export default router