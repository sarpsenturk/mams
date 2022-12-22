import {Router} from "express";
import {isAuthenticated} from "../middleware/is-authenticated.js";
import {isDoctor} from "../middleware/is-doctor.js";

export default (database) => {
    // Create appointment router
    const router = Router()

    // Router wide middleware
    router.use(isAuthenticated, isDoctor(database))

    // Setup appointment routes
    router.post("/create", async (req, res) => {
        try {
            const {patient_id, doctor_id, date_time} = req.body
            if (!patient_id || !doctor_id || !date_time) {
                return res.status(400).json({err: "Missing required information to create appointment"})
            }
            const [result] = await database.execute("INSERT INTO appointment (patient_id, doctor_id, date_time) VALUES (?, ?, ?)", [patient_id, doctor_id, date_time])
            return res.status(201).json({result: {appointmentId: result.insertId}})
        } catch (err) {
            console.error(err)
            return res.status(500).json({err})
        }
    })

    router.get("/:appointment_id", async (req, res) => {
        try {
            const appointmentId = req.params["appointment_id"]
            const [result] = await database.execute(
                "SELECT a.appointment_id, " +
                "a.date_time, " +
                "s.first_name AS doctor_first_name, s.last_name AS doctor_last_name, " +
                "d.room_number " +
                "FROM appointment a " +
                "INNER JOIN staff s ON s.staff_id = a.doctor_id " +
                "INNER JOIN doctor d ON d.doctor_id = a.doctor_id " +
                "WHERE a.appointment_id = ?",
                [appointmentId]
            )
            if (result.length === 0) {
                return res.status(404).json({err: `No appointment with id ${appointmentId} found`})
            }
            return res.status(200).json({result: {appointment: result[0]}})
        } catch (err) {
            console.error(err)
            return res.status(500).json({err})
        }
    })

    return router
}
