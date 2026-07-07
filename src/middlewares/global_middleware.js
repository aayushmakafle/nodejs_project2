//x-api-key="secA-NodeJs-api-key"
//creating middleware to check x-api-key in header
export let checkApiKeyMiddleware = (req, res, next) => {
    let xApiKey = req.headers["x-api-key"]
    if (!xApiKey) {
        return res.status(400).json({
            message: "x api key header required"
        })
    }
    if (xApiKey !== "secA-NodeJs-api-key") {
        return res.status(400).json({
            message: "x api key invalid"
        })
    }
    next()
}
//attaching request timestamp to request for every routes from middleware
export let attachRequestTimestamp = (req, res, next) => {
    req.requestTimestamp = new Date().toISOString()
    next()
}
