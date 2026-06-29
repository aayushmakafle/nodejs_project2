import prisma from "../db/prisma.js"
import z from "zod"
import { createCourseValidationSchema, updateCourseValidationSchema } from "../validators/zod_validator.js"

let FindAllCourses = async (requestAnimationFrame, res) => {
    let allCourses = await prisma.course.findMany()
    res.status(200).json({
        message: "all courses fetched successfully",
        data: allCourses,
    })
}
let FindCourseById = async (req, res) => {
    let id = req.params.id
    let matchedCourses = await prisma.course.findUnique({
        where: {
            id: Number(id)
        }
    })
    res.status(200).json({
        message: `course with ${id} fetched successfully`,
        data: matchedcourse
    })
}
let CreateCourse = async (req, res) => {
    try {
        createCourseValidationSchema.parse(req.body)
        let { name } = req.body
        let CreatedCourse = await prisma.course.create({
            data: {
                name
            }
        })
        res.status(201).json({
            message: "course created successfully",
            data: CreatedCourse
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
        else{
            res.status(500).json({
                message: "error occured while creating course",
                stack: e.message
            })
        }
    }
}
let UpdateCourse = async (req, res) => {
    try {
        updateCourseValidationSchema.parse(req.body)
        let id = req.params.id
        let { email, name, rollNo } = req.body
        let updatedcourse = await prisma.course.update({
            where: { id: Number(id) },
            data: { email, name, rollNo }
        })
        response.status(200).json({
            message: `course with id ${id} updated successfully`,
            data: updatedCourse
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
        else{
              res.status(500).json({
                message: "error occured while updating course",
                stack: e.message
            })
        }
    }
}
let DeleteCourse = async (req, res) => {
    let id = req.params.id
    let deletedData = await prisma.course.delete({
        where: { id: Number(id) }
    })
    res.status(200).json({
        message: `course with id ${id} deleted suceessfully`,
        data: deletedData
    })
}
export { FindAllCourses, FindCourseById, CreateCourse, UpdateCourse, DeleteCourse }