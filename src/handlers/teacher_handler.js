import prisma from "../db/prisma.js"

let FindAllTeachers = async (requestAnimationFrame, res) => {
    let allTeachers = await prisma.teacher.findMany()
    res.status(200).json({
        message: "all teacher fetched successfully",
        data: allTeachers,
    })
}
let FindTeacherById = async (req, res) => {
    let id = req.params.id
    let matchedTeacher = await prisma.teacher.findUnique({
        where: {
            id: Number(id)
        }
    })
    res.status(200).json({
        message: `teacher with ${id} fetched successfully`,
        data: matchedTeacher
    })
}
let CreateTeacher = async (req, res) => {
    let { email, name ,departmentId} = req.body
    let createdTeacher = await prisma.teacher.create({
        data: {
            name,
            email,
            department:{
                connect:{
                    id:Number(departmentId)
                }
            }
        },
    })
    res.status(201).json({
        message: "teacher created successfully",
        data: createdTeacher
    })
}
let UpdateTeacher = async (req, res) => {
    let id = req.params.id
    let { email, name, rollNo } = req.body
    let updatedTeacher = await prisma.teacher.update({
        where: { id:Number(id) },
        data: { email, name, rollNo }
    })
    response.status(200).json({
        message: `teacher with id ${id} updated successfully`,
        data: updatedTeacher
    }
    )
}
let DeleteTeacher = async (req, res) => {
    let id = req.params.id
    let deletedData = await prisma.teacher.delete({
        where: { id:Number(id) }
    })
    res.status(200).json({
        message: `teacher with id ${id} deleted suceessfully`,
        data: deletedData
    })
}
export { FindAllTeachers, FindTeacherById, CreateTeacher, UpdateTeacher, DeleteTeacher }