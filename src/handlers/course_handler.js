import prisma from "../db/prisma.js"

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
    let { email, name, rollNo } = req.body
    let CreatedCourse = await prisma.course.create({
        data: {
            name,
            email,
            rollNo
        }
    })
    res.status(201).json({
        message: "course created successfully",
        data: CreatedCourse
    })
}
let UpdateCourse = async (req, res) => {
    let id = req.params.id
    let { email, name, rollNo } = req.body
    let updatedcourse = await prisma.course.update({
        where: { id:Number(id) },
        data: { email, name, rollNo }
    })
    response.status(200).json({
        message: `course with id ${id} updated successfully`,
        data: updatedCourse
    }
    )
}
let DeleteCourse = async (req, res) => {
    let id = req.params.id
    let deletedData = await prisma.course.delete({
        where: { id:Number(id) }
    })
    res.status(200).json({
        message: `course with id ${id} deleted suceessfully`,
        data: deletedData
    })
}
export { FindAllCourses,FindCourseById,CreateCourse,UpdateCourse,DeleteCourse }