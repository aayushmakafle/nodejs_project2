import prisma from "../db/prisma.js"
import { loginValidatorSchema, registerValidatorSchema } from "../validators/auth_validator.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { success } from "zod"
export let RegisterUser = async (req, res) => {
    let result = registerValidatorSchema.safeParse(req.body)
    if (!result.success) {
        const errors = result.error.issues.map((ele) => {
            return {
                field: ele.path[0],
                message: ele.message
            }
        })
        return res.status(400).json({
            success: false,
            message: "request data not valid",
            errors: errors
        })
    }
    let { username, email, password } = result.data
    try {
        //bcrypt.hash(password,salt_round)
        //step2:hash the password before saving using bcrypt
        //bcrypt: bcrupt.hash runs the hashing algorithm 2^salt_round (2^10=1024 times)
        let hashedPassword = await bcrypt.hash(password, 10)
        console.log("hash password:", hashedPassword)
        //step 3:save the user with the hashed password
        const user = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword
            },
        })
        res.status(201).json({
            success: true,
            message: "user created successfully",
            data: user
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "something went wrong while creating user",
            stack: e.message
        })
    }
}
//login steps
//1. validate the incomming or request data(email and password)
//2.check user exists with provided email
//3.compare the provided password with the stored hashed password using bcrypt
//4.generateor sign the jwt token with payload (user data:id,email,role) and expired date
//5. send token to client through response
export let Login = async (req, res) => {
    //validating incomming data(email and password)
    let vResult = loginValidatorSchema.safeParse(req.body)
    if (!vResult.success) {
        const allErrors = vResult.error.issues.map((ele) => {
            return {
                field: ele.path[0],
                message: ele.message,
            }
        })
        return res.status(400).json({
            success: false,
            message: "validation error",
            errors: allErrors
        })
    }
    try {
        let { email, password } = vResult.data
        //check for user with provided email
        let foundUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (!foundUser) {
            return res.status(404).json({
                success: false,
                message: `user with email ${email} not found`
            })
        }
        console.log("found user:", foundUser)
        //compare the provided password with the hashed one using bcrypt
        let isMatched = await bcrypt.compare(password, foundUser.password)
        if (!isMatched) {
            return res.status(401).json({
                success: false,
                message: `password doesnot match`
            })
        }
        //generating token with payload and expiry using jwt
        let token = await jwt.sign(
            {
                id: foundUser.id,
                email: foundUser.email,
                role: foundUser.role
            },//payload: to store the user info
            process.env.MYJWTSECRETKEY,//jwt secured secret key or private key
            {
                expiresIn: '2d'
            },//config)
        )
        res.status(200).json({
            success: true,
            message: "user logged in successfully",
            token: token
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "error in log in",
            error: e
        })
    }
}
export let getProfile = async (req, res) => {
    let id = req.payload.id
    try {
        let user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })
        res.status(200).json({
            success: true,
            message: "user profile fetched successfully",
            data: user
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "error in fetching user profile",
            error: e.message
        })
    }
}
export let updateProfile = async (req, res) => {
    let id = req.payload.id
    let { username, email } = req.body
    //validate incoming data with zod
    let profileImageUrl = `/uploads/${req.file.filename}`
    try {
        let updatedData = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                username: username,
                email: email,
                profileImage: profileImageUrl
            }
        })
        res.status(200).json({
            success: true,
            message: "user profile updated successfully",
            data: updatedUser

        })
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "error in updating user profile",
            error: e.message
        })
    }
}