import prisma from "../db/prisma.js"
import z from "zod"
import { createStudentValidationSchema, updateStudentValidationSchema } from "../validators/zod_validator.js"

let FindAllStudents = async (requestAnimationFrame, res) => {
    let allStudents = await prisma.student.findMany()
    res.status(200).json({
        message: "all student fetched successfully",
        data: allStudents,
    })
}
let FindStudentById = async (req, res) => {
    let id = req.params.id
    let matchedStudent = await prisma.student.findUnique({
        where: {
            id: Number(id)
        }
    })
    res.status(200).json({
        message: `student with ${id} fetched successfully`,
        data: matchedStudent
    })
}
let CreateStudent = async (req, res) => {
    try {
        createStudentValidationSchema.parse(req.body)
        let { email, name, rollNo, departmentId } = req.body
        let createdStudent = await prisma.student.create({
            data: {
                name,
                email,
                rollNo,
                department: {
                    connect: {
                        id: Number(departmentId)
                    }
                }
            }
        })
        res.status(201).json({
            message: "student created successfully",
            data: createdStudent
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
                message: "validation failed",
                errors
            })
        }
        else {
            res.status(500).json({
                message: "error occured while creating student",
                stack: e.message
            })
        }
    }
}
let UpdateStudent = async (req, res) => {
    try {
        updateStudentValidationSchema.parse(req.body)
        let id = req.params.id
        let { email, name, rollNo } = req.body
        let updatedStudent = await prisma.student.update({
            where: { id: Number(id) },
            data: { email, name, rollNo }
        })
        response.status(200).json({
            message: `student with id ${id} updated successfully`,
            data: updatedStudent
        }
        )
    } catch (e) {
        if (e instanceof z.ZodError) {
            let errors = e.issues.map((ele) => {
                return {
                    field: ele.path[0],
                    message: ele.message
                }
            })
            res.status(400).json({
                message: "validation failed",
                errors
            })
        }
        else {
            res.status(500).json({
                message: "error occured while updating student",
                stack: e.message
            })
        }
    }
}
let DeleteStudent = async (req, res) => {
    let id = req.params.id
    let deletedData = await prisma.student.delete({
        where: { id: Number(id) }
    })
    res.status(200).json({
        message: `student with id ${id} deleted suceessfully`,
        data: deletedData
    })
}
export { FindAllStudents, FindStudentById, CreateStudent, UpdateStudent, DeleteStudent }