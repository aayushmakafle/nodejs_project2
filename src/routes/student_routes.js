import { Router } from "express"
import { CreateStudent, DeleteStudent, FindAllStudents, FindStudentById, UpdateStudent } from "../handlers/handler.js"
import { authMiddleware } from "../middlewares/auth_middleware.js"
let router = Router()

router.get("/", authMiddleware, FindAllStudents)
router.get(
    "/:id",
    FindStudentById
)
router.post(
    "/",authMiddleware,
    CreateStudent
)
router.put(
    "/:id",authMiddleware,
    UpdateStudent
)
router.delete(
    "/:id",authMiddleware,
    DeleteStudent
)

export default router