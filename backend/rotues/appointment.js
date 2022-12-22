import {Router} from "express";

export default (database) => {
    // Create appointment router
    const router = Router()

    // Setup appointment routes
    router.get("/", (req, res) => {
        return res.status(200).send("Hello from /appointment")
    })

    return router
}
