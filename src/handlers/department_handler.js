import prisma from "../db/prisma.js"
import z from "zod"
import { createDepartmentValidationSchema, updateDepartmentValidationSchema } from "../validators/zod_validator.js"

let FindAllDepartments = async (requestAnimationFrame, res) => {
    let allDepartments = await prisma.department.findMany({
        include: {
            teachers: true,
            students: true,
        }
    })
    res.status(200).json({
        message: "all department fetched successfully",
        data: allDepartments,
    })
}
let FindDepartmentById = async (req, res) => {
    let id = req.params.id
    let matchedDepartment = await prisma.department.findUnique({
        where: {
            id: Number(id)
        }
    })
    res.status(200).json({
        message: `department with ${id} fetched successfully`,
        data: matchedDepartment
    })
}
let CreateDepartment = async (req, res) => {
    try {
        createDepartmentValidationSchema.parse(req.body)
        let { name } = req.body
        let createDepartment = await prisma.department.create({
            data: {
                name,
            }
        })
        res.status(201).json({
            message: "department created successfully",
            data: createDepartment
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
                message: "error occured while creating department",
                stack: e.message
            })
        }
    }
}
let UpdateDepartment = async (req, res) => {
    try {
        updateDepartmentValidationSchema.parse(req.body)
        let id = req.params.id
        let { name } = req.body
        let updatedDepartment = await prisma.department.update({
            where: { id: Number(id) },
            data: { name, }
        })
        response.status(200).json({
            message: `department with id ${id} updated successfully`,
            data: updatedDepartment
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
    }
}
let DeleteDepartment = async (req, res) => {
    let id = req.params.id
    let deletedData = await prisma.department.delete({
        where: { id: Number(id) }
    })
    res.status(200).json({
        message: `department with id ${id} deleted suceessfully`,
        data: deletedData
    })
}
export { FindAllDepartments, FindDepartmentById, CreateDepartment, UpdateDepartment, DeleteDepartment }