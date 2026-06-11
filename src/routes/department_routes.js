import { Router } from "express"
import { CreateDepartment, DeleteDepartment, FindAllDepartments, FindDepartmentById, UpdateDepartment } from "../handlers/department_handler.js"
let router=Router()
router.get(
    "/",FindAllDepartments
)
router.get(
    "/:id",
    FindDepartmentById
)
router.post(
    "/",
    CreateDepartment
)
router.put(
    "/:id",
    UpdateDepartment
)
router.delete(
    "/:id",
    DeleteDepartment
)

export default router