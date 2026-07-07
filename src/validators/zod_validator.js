import z from 'zod';
let nameValidator = z.string().min(2, { message: "name must be more than 2 letters" }).max(100, { message: "name must be less than 100 letters" });
let emailValidator = z.email({ message: "email is not valid" });
let idValidator = z.int().nonnegative({ message: "id cannot be negative" });

export let createTeacherValidationSchema = z.object({
    name: nameValidator,
    email: emailValidator,
    departmentId: idValidator
})
let rollNoValidator = z.int().nonnegative({ message: "roll number cannot be negative" })
export let updateTeacherValidationSchema = z.object({
    name: nameValidator,
    email: emailValidator,
    rollNo: rollNoValidator
})
export let createDepartmentValidationSchema = z.object({
    name: nameValidator
})
export let updateDepartmentValidationSchema = z.object({
    name: nameValidator
})
export let createStudentValidationSchema = z.object({
    name: nameValidator,
    email: emailValidator,
    rollNo: rollNoValidator
})
export let updateStudentValidationSchema = z.object({
    name: nameValidator,
    email: emailValidator,
    rollNo: rollNoValidator
})
export let createCourseValidationSchema = z.object({
    name: nameValidator,
    code: z.string().min(2, { message: "code must be more than 2 letters" }).max(10, { message: "code must be less than 10 letters" }),
    departmentId: idValidator
})
export let updateCourseValidationSchema = z.object({
    name: nameValidator,
    code: z.string().min(2, { message: "code must be more than 2 letters" }).max(10, { message: "code must be less than 10 letters" })
})
export let createEnrollmentValidationSchema = z.object({
    studentId: idValidator,
    courseId: idValidator
})
export let updateEnrollmentValidationSchema = z.object({
    studentId: idValidator,
    courseId: idValidator
})