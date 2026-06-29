
import { makeStrictEnum } from "@prisma/client/runtime/client"
import prisma from "../db/prisma.js"
import e from "express"
import z from "zod"
import { createEnrollmentValidationSchema,updateEnrollmentValidationSchema } from "../validators/zod_validator.js"

// import prisma from "../db/prisma.js";
let FindAllEnrollments = async (req, res) => {
    let allEnrollments = await prisma.enrollment.findMany()
    res.status(200).json({
        message: "all enrollments fetched successfully",
        data: allEnrollments,
    })
}
let FindEnrollmentById = async (req, res) => {
    let id = req.params.id
    let matchedEnrollment = await prisma.enrollment.findUnique({
        where: {
            id: Number(id)
        }
    })
    res.status(200).json({
        message: `Enrollment with ${id} fetched successfully`,
        data: matchedEnrollment
    })
}
let CreateEnrollment = async (req, res) => {
    try {
        createEnrollmentValidationSchema.parse(req.body)
        let { email, name, rollNo } = req.body
        let createEnrollment = await prisma.enrollment.create({
            data: {
                name,
                email,
                rollNo
            }
        })
        res.status(201).json({
            message: "Enrollment created successfully",
            data: createEnrollment
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
                message: "error occured while creating enrollment",
                stack: e.message
            })
        }
    }
}
let UpdateEnrollment = async (req, res) => {
    try {
        updateEnrollmentValidationSchema.parse(req.body)
        let id = req.params.id
        let { email, name, rollNo } = req.body
        let updatedEnrollment = await prisma.enrollment.update({
            where: { id: Number(id) },
            data: { email, name, rollNo }
        })
        res.status(200).json({
            message: `Enrollment with id ${id} updated successfully`,
            data: updatedEnrollment
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
                message: "error occured while updating enrollment",
                stack: e.message
            })
        }
    }
}
let DeleteEnrollment = async (req, res) => {
    let id = req.params.id
    let deletedData = await prisma.enrollment.delete({
        where: { id: Number(id) }
    })
    res.status(200).json({
        message: `Enrollment with id ${id} deleted successfully`,
        data: deletedData
    })
}
export let enrollStudentToCourse = async (req, res) => {
    try {
        let { student_id, course_id, enrolled_at } = req.body
        //validation for student_id and course_id
        if (!student_id || !course_id) {
            res.status(400).json({
                message: "student_id and course_id are required"
            })
            return
        }
        if (isNaN(student_id) || Number(student_id) <= 0) {
            res.status(400).json({
                message: "invalid student id"
            })
            return
        }
        if (isNaN(course_id) || Number(course_id) <= 0) {
            res.status(400).json({
                message: "invalid course id"
            })
            return
        }
        //validating enrolled_at
        if (enrolled_at && isNaN(Date.parse(enrolled_at)) <= 0) {
            res.status(400).json({
                message: "invalid enrolled_at id"
            })
            return
        }

        //creating enrollment
        const enrollment = await prisma.enrollment.create({
            data: {
                student: {
                    connect: {
                        id: Number(student_id)
                    }
                },
                course: {
                    connect: {
                        id: Number(course_id)
                    }
                },
                enrolledAt: Date.parse(enrolled_at) ? new Date(enrolled_at) : new Date()
            },
            include: {
                student: true,
                course: true
            }
            // select:{
            //     id: true,
            //     created_at:true,
            //     status:true,
            //     enrolled_at:true
            // }
        })
        res.status(201).json({
            message: "student enrolled to coures successfully",
            data: enrollment
        })

    }

    catch (e) {
        res.status(500).json({
            message: "error occured while enrolling students to course",
            stack: e.message
        })
    }
}
export { FindAllEnrollments, FindEnrollmentById, CreateEnrollment, UpdateEnrollment, DeleteEnrollment }