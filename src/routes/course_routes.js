import { Router } from "express"
import { CreateCourse, DeleteCourse, FindAllCourses, FindCourseById, UpdateCourse } from "../handlers/course_handler.js"
let router=Router()

router.get(
    "/",FindAllCourses
)
router.get(
    "/:id",
    FindCourseById
)
router.post(
    "/",
    CreateCourse
)
router.put(
    "/:id",
    UpdateCourse
)
router.delete(
    "/:id",
    DeleteCourse
)

export default router