import express from "express";
import dotenv from "dotenv"
import studentRouter from "./routes/student_routes.js"
import departmentRouter from "./routes/department_routes.js"
import teacherRouter from "./routes/teacher_routes.js"
import courseRouter from "./routes/course_routes.js"
import enrollmentRouter from "./routes/enrollment_routes.js"
import { attachRequestTimestamp, checkApiKeyMiddleware } from "./middlewares/global_middleware.js";
import { customErrorMiddleware } from "./middlewares/error_middleware.js";
import authRouter from "./routes/auth_routes.js";
import { uploadFileHandler } from "./handlers/upload_handler.js";
import { upload } from "./middlewares/upload_middleware.js";
dotenv.config()
let app = express()
app.use(express.json())
app.post("/uploads",upload.single("profile"),uploadFileHandler)
//logger middleware
app.use((req,res,next)=>{
    let timeStamp=new Date().toISOString
    let url=req.url
    let method=req.method
    console.log("timestamp:",timeStamp,"url:",url,"method:",method)
    if(url=="/apikey"){
        res.status(400).json({
            message:"invalid routes",
            data:url
        })
        return
    }
    //forwarding to further task
    next()
})

app.use("/student",studentRouter)
app.use("/department",departmentRouter)
app.use("/teacher",teacherRouter)
app.use("/course",courseRouter)
app.use("/enrollment",enrollmentRouter)
app.use("/auth",authRouter)
//for multiple 
authRouter.put("/upload-multiple-files")
//response middleware to modify the error should be at last of all routes
app.use(customErrorMiddleware)

let PORT = process.env.PORT || 8888
app.get("/",(req,res)=>{
    res.json({
        message:"server initial routes created successfully"
    })
})
app.listen(PORT,()=>{
    console.log("server started at "+ PORT)
})