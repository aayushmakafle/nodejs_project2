import prisma from "../db/prisma.js"

let FindAllEnrollments = async (requestAnimationFrame, res) => {
    let allEnrollments = await prisma.enrollment.findMany()
    res.status(200).json({
        message: "all enrollment fetched successfully",
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
        message: `enrollment with ${id} fetched successfully`,
        data: matchedEnrollment
    })
}
let CreateEnrollment = async (req, res) => {
    let { email, name, rollNo } = req.body
    let CreatedEnrollment = await prisma.enrollment.create({
        data: {
            name,
            email,
            rollNo
        }
    })
    res.status(201).json({
        message: "enrollment created successfully",
        data: createdEnrollment
    })
}
let UpdateEnrollment = async (req, res) => {
    let id = req.params.id
    let { email, name, rollNo } = req.body
    let updatedEnrollment = await prisma.enrollment.update({
        where: { id:Number(id) },
        data: { email, name, rollNo }
    })
    response.status(200).json({
        message: `enrollment with id ${id} updated successfully`,
        data: updatedEnrollment
    }
    )
}
let DeleteEnrollment = async (req, res) => {
    let id = req.params.id
    let deletedData = await prisma.enrollment.delete({
        where: { id:Number(id) }
    })
    res.status(200).json({
        message: `enrollment with id ${id} deleted suceessfully`,
        data: deletedData
    })
}
export { FindAllEnrollments, FindEnrollmentById, CreateEnrollment, UpdateEnrollment, DeleteEnrollment }