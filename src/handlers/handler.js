import prisma from "../db/prisma.js"

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
    let { email, name, rollNo } = req.body
    let createdStudent = await prisma.student.create({
        data: {
            name,
            email,
            rollNo
        }
    })
    res.status(201).json({
        message: "student created successfully",
        data: createdStudent
    })
}
let UpdateStudent = async (req, res) => {
    let id = req.params.id
    let { email, name, rollNo } = req.body
    let updatedStudent = await prisma.student.update({
        where: { id:Number(id) },
        data: { email, name, rollNo }
    })
    response.status(200).json({
        message: `student with id ${id} updated successfully`,
        data: updatedStudent
    }
    )
}
let DeleteStudent = async (req, res) => {
    let id = req.params.id
    let deletedData = await prisma.student.delete({
        where: { id:Number(id) }
    })
    res.status(200).json({
        message: `student with id ${id} deleted suceessfully`,
        data: deletedData
    })
}
export { FindAllStudents, FindStudentById, CreateStudent, UpdateStudent, DeleteStudent }