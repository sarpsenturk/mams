import {Router} from "express";
import {isAuthenticated} from "../middleware/is-authenticated.js";
import {isDoctor} from "../middleware/is-doctor.js";
import {createWhereClause} from "../utils/create-where-clause.js";

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

    router.get("/search", async (req, res) => {
        let patient = {}
        if (req.query.first_name[0])
            patient['first_name'] = req.query.first_name[0]
        if (req.query.last_name[0])
            patient['last_name'] = req.query.last_name[0]
        let doctor = {}
        if (req.query.first_name[1])
            doctor['first_name'] = req.query.first_name[1]
        if (req.query.last_name[1])
            doctor['last_name'] = req.query.last_name[1]
        const date = req.query.date ? {date_time: req.query.date} : {}

        const patientWhere = createWhereClause(patient, database, 'p.', true, false)
        const doctorWhere = createWhereClause(doctor, database, 's.', true, false)
        const dateWhere = createWhereClause(date, database, '', true, false)
        const whereClause = `${patientWhere}${doctorWhere}${dateWhere}`

        let query =
            "SELECT a.appointment_id, a.date_time, " +
            "p.first_name AS patient_first_name, p.last_name AS patient_last_name, " +
            "s.first_name AS doctor_first_name, s.last_name AS doctor_last_name, " +
            "d.room_number " +
            "FROM appointment a " +
            "INNER JOIN patient p ON p.patient_id = a.patient_id " +
            "INNER JOIN staff s ON s.staff_id = a.doctor_id " +
            "INNER JOIN doctor d ON d.doctor_id = a.doctor_id "
        if (whereClause.length !== 0) {
            query += `WHERE ${whereClause}`
            query = query.substring(0, query.length - 4)
        }
        // console.log(query)
        try {
            const [result] = await database.query(query)
            return res.status(200).json({result})
        } catch (err) {
            console.error(err)
            return res.status(500).json(err)
        }
    })

    router.delete("/:appointment_id", async (req, res) => {
        try {
            const appointmentId = req.params["appointment_id"]
            if (!appointmentId) {
                return res.status(400).json({msg: "Missing appointment ID"})
            }
            const [result] = await database.execute(
                'DELETE FROM appointment WHERE appointment_id = ?',
                [appointmentId])
            const status = result.rowsAffected === 0 ? 204 : 202
            return res.status(status).send()
        } catch (err) {
            console.error(err)
            return res.status(500).json({err})
        }
    })

    return router
}
