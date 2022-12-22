import {Router} from "express";

export default () => {
    // Create staff router
    const router = Router()

    // Setup staff routes
    router.get("/", (req, res) => {
        return res.status(200).send("Hello from /staff")
    })

    return router
}
