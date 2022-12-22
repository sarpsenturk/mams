export function isAdmin(req, res, next) {
    if (!req.user) {
        return res.status(403).json({err: "User is not authenticated"})
    }
    if (!req.user["is_admin"]) {
        return res.status(403).json({err: "User is not an admin"})
    }
    next()
}
