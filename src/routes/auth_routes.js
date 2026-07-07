import { Router } from "express"
import { getProfile, Login, RegisterUser, updateProfile } from "../handlers/auth_handler.js"
import { authMiddleware } from "../middlewares/auth_middleware.js"
import {upload} from "../middlewares/upload_middleware.js"

let authRouter=Router()
authRouter.post("/register",RegisterUser)
authRouter.post("/login",Login)
authRouter.get("/profile",authMiddleware,getProfile)
authRouter.put("/update-profile",authMiddleware,upload.single("profile_image"),updateProfile)
export default authRouter


