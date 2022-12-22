import {Router} from "express";

export default () => {
    // Create patient router
    const router = Router()

    // Setup patient routes
    router.get("/", (req, res) => {
        return res.status(200).send("Hello from /patient")
    })

    return router
}
