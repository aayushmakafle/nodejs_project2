import { makeStrictEnum } from "@prisma/client/runtime/client"
import prisma from "../db/prisma.js"
import { createTeacherValidationSchema, updateTeacherValidationSchema } from "../validators/zod_validator.js"
import z from "zod"

// import prisma from "../db/prisma.js";
let FindAllTeachers = async (req, res) => {
    let allTeachers = await prisma.teacher.findMany({
        include: {
            department: {
                select: {
                    id: true,
                    name: true
                }
            },
            courses: true
        }
    })
    res.status(200).json({
        message: "all teachers fetched successfully",
        data: allTeachers,
    })
}
//using prisma relation select
let FindAllTeachersWithSelect = async (req, res) => {
    let allTeachers = await prisma.teacher.findMany({
        select: {
            name: true,
            id: true,
            department: {
                select: {
                    name: true,
                    id: true
                }
            }
        }
    })
    res.status(200).json({
        message: "all teachers fetched successfully",
        data: allTeachers,
    })
}
//sorting with orderby
export let sortTeachers = async (req, res) => {
    let teachers = await prisma.teacher.findMany({
        orderBy: {
            name: "desc"
        }
    })
    res.status(200).json({
        message: "sorted teachers",
        data: teachers
    })
}
//filtering:
export let filterTeachers = async (req, res) => {
    let teachers = await prisma.teacher.findMany({
        where: {
            name: {
                startsWith: "r"
            }
        }
    })
    res.status(200).json({
        message: "filtered teachers",
        data: teachers
    })
}
let FindTeacherById = async (req, res) => {
    let id = req.params.id
    let matchedTeacher = await prisma.teacher.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            department: true,
            courses: true
        }
    })
    res.status(200).json({
        message: `Teacher with ${id} fetched successfully`,
        data: matchedTeacher
    })
}
let CreateTeacher = async (req, res) => {
    let result = createTeacherValidationSchema.safeParse(req.body)
    if (!result.success) {
        let errors = result.error.issues.map((ele) => {
            return {
                field: ele.path[0],
                message: ele.message
            }
        })
        return res.status(400).json({
            message: "Validation error",
            errors: errors
        })
    }
    let { email, name, departmentId } = req.body
    let createTeacher = await prisma.teacher.create({
        data: {
            name,
            email,
            department: {
                connect: {
                    id: Number(departmentId)
                }
            }
        }
    })
    res.status(201).json({
        message: "Teacher created successfully",
        data: createTeacher
    })
}
//using create prisma relation
let CreateTeacherWithDepartment = async (req, res) => {
    let { email, name, departmentName } = req.body
    let createTeacher = await prisma.teacher.create({
        data: {
            name,
            email,
            department: {
                create: {
                    name: departmentName
                }
            }
        }
    })
    res.status(201).json({
        message: "Teacher created successfully",
        data: createTeacher
    })
}
let UpdateTeacher = async (req, res) => {
    try {
        updateTeacherValidationSchema.parse(req.body)
        let id = req.params.id
        let { email, name, rollNo } = req.body
        let updatedTeacher = await prisma.teacher.update({
            where: { id: Number(id) },
            data: { email, name, rollNo }
        })
        res.status(200).json({
            message: `Teacher with id ${id} updated successfully`,
            data: updatedTeacher
        })
    } catch (e) {
        if (e instanceof z.ZodError) {
            let errors = e.issues.map((ele) => {
                return {
                    field: ele.path[0],
                    message: ele.message
                }
            })
            res.status(400).json({
                message: "Validation error",
                errors: errors
            })
        } else {
            res.status(500).json({
                message: "Internal server error",
                error: e.message
            })
        }
    }
}
let DeleteTeacher = async (req, res) => {
    let id = req.params.id
    let deletedData = await prisma.teacher.delete({
        where: { id: Number(id) }
    })
    res.status(200).json({
        message: `Teacher with id ${id} deleted successfully`,
        data: deletedData
    })
}
export { FindAllTeachers, FindAllTeachersWithSelect, FindTeacherById, CreateTeacher, CreateTeacherWithDepartment, UpdateTeacher, DeleteTeacher }