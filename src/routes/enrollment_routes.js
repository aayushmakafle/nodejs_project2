import { Router } from "express"
import { CreateEnrollment, DeleteEnrollment, FindAllEnrollments, FindEnrollmentById, UpdateEnrollment } from "../handlers/enrollment_handler.js"
let router=Router()

router.get(
    "/",FindAllEnrollments
)
router.get(
    "/:id",
    FindEnrollmentById
)
router.post(
    "/",
    CreateEnrollment
)
router.put(
    "/:id",
    UpdateEnrollment
)
router.delete(
    "/:id",
    DeleteEnrollment
)

export default router