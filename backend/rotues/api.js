import {Router} from "express";
import appointment from "./appointment.js";
import patient from "./patient.js";
import staff from "./staff.js"

export default () => {
    // Create api router
    const router = Router()

    // Setup api routes
    router.use("/appointment", appointment())
    router.use("/patient", patient())
    router.use("/staff", staff())

    return router
}

