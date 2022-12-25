import jwt from "jsonwebtoken";

export function isAuthenticated(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (!token) {
        return res.status(401).json({msg: "No authentication token"})
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({msg: "Invalid authentication token"})
        }
        req.user = user
        next()
    })
}