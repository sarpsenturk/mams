import {Router} from "express";
import appointment from "./appointment.js";
import patient from "./patient.js";
import staff from "./staff.js"
import auth from "./auth.js";

export default (database) => {
    // Create api router
    const router = Router()

    // Setup api routes
    router.use("/appointment", appointment(database))
    router.use("/patient", patient(database))
    router.use("/staff", staff(database))
    router.use("/auth", auth(database))

    return router
}

