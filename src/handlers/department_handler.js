import prisma from "../db/prisma.js"

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
}
let UpdateDepartment = async (req, res) => {
    let id = req.params.id
    let { email, name, rollNo } = req.body
    let updatedDepartment = await prisma.department.update({
        where: { id: Number(id) },
        data: { email, name, rollNo }
    })
    response.status(200).json({
        message: `department with id ${id} updated successfully`,
        data: updatedDepartment
    }
    )
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