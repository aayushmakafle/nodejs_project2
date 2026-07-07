import { success } from "zod"
import jwt from "jsonwebtoken"

export let authMiddleware = async (req, res, next) => {
    let authHeader = req.headers.authorization
    //check if Authorization header is available or not
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Authorization header is required"
        })
    }
    //check if auth header starts with Bearer
    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Authorization header is not valid"
        })
    }
    let token = authHeader.split(" ")[1]
    if (token === "") {
        return res.status(401).json({
            success: false,
            message: "Token is not valid"
        })
    }
    try {
        //verify the token or validate the token
        let decodedDataFromToken = jwt.verify(token, process.env.MYJWTSECRETKEY)
        console.log("decoded data from token:", decodedDataFromToken)
        //let exp=decodedDataFromToken.exp
        //Attach user data or payload to req for further use
        req.payload = {
            id: decodedDataFromToken.id,
            email: decodedDataFromToken.email,
            role: decodedDataFromToken.role
        }
        next()
    } catch (e) {
        console.log("error:", e.name)
        if (!e.name === "TokenExpiredError") {
            res.status(401).json({
                success: false,
                message: `Token has expired at: ${e.expiredAt}`
            })
        }
        res.status(401).json({
            success: false,
            message: "token invaid",
            stack: e
        })
    }
}