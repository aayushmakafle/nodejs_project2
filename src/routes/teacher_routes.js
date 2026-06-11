import { Router } from "express"
import { CreateTeacher, DeleteTeacher, FindAllTeachers, FindTeacherById, UpdateTeacher } from "../handlers/teacher_handler.js"
let router=Router()

router.get(
    "/",FindAllTeachers
)
router.get(
    "/:id",
    FindTeacherById
)
router.post(
    "/",
    CreateTeacher
)
router.put(
    "/:id",
    UpdateTeacher
)
router.delete(
    "/:id",
    DeleteTeacher
)

export default router