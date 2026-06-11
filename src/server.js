import express from "express"
import dotenv from "dotenv"
import studentRouter from "./routes/student_routes.js"
import departmentRouter from "./routes/department_routes.js"
import courseRouter from "./routes/course_routes.js"
import enrollmentRouter from "./routes/enrollment_routes.js"
import teacherRouter from "./routes/teacher_routes.js"

dotenv.config()
    let app=express()
    app.use(express.json())
    app.use("/student",studentRouter)
    app.use("/department",departmentRouter)
    app.use("/course",courseRouter)
    app.use("/enrollment",enrollmentRouter)
    app.use("/teacher",teacherRouter)    
    let PORT=process.env.PORT ||8888
    app.get("/",(req,res)=>{
        res.json({
            message:"server initial routes called successfully"
        })
    })
    app.listen(PORT,()=>{
        console.log("server started at" +PORT)
    })