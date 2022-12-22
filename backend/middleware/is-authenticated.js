import jwt from "jsonwebtoken";

export function isAuthenticated(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (!token) {
        return res.status(401).json({err: "No authentication token"})
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({err: "Invalid authentication token"})
        }
        req.user = user
        next()
    })
}