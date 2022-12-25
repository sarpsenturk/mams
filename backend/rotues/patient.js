import {Router} from "express";
import {isAuthenticated} from "../middleware/is-authenticated.js";
import {isDoctor} from "../middleware/is-doctor.js";
import {createWhereClause} from "../utils/create-where-clause.js";

export default (database) => {
    // Create patient router
    const router = Router()

    // Router wide middleware
    router.use(isAuthenticated, isDoctor(database))

    // Setup patient routes
    router.get("/", (req, res) => {
        return res.status(200).send("Hello from /patient")
    })

    router.post("/create", async (req, res) => {
        try {
            // Validate patient data
            const {first_name, last_name, contact_phone, contact_email, birthdate} = req.body
            if (!first_name || !last_name || !contact_phone || !contact_email || !birthdate) {
                return res.status(400).json({msg: "Missing required information to create patient"})
            }

            // Create the patient
            const [result] = await database.execute(
                "INSERT INTO patient (first_name, last_name, contact_phone, contact_email, birthdate) VALUES (?, ?, ?, ?, ?)",
                [first_name, last_name, contact_phone, contact_email, birthdate])
            return res.status(201).json({result: {patientId: result.insertId}})
        } catch (err) {
            console.error(err)
            return res.status(500).json({err})
        }
    })

    router.get("/search", async (req, res) => {
        const query = `SELECT * FROM patient ${createWhereClause(req.query, database)}`
        try {
            const [results] = await database.query(query)
            return res.status(200).json({result: results})
        } catch (err) {
            console.error(err)
            return res.status(500).json(err)
        }
    })

    router.get("/:patient_id", async (req, res) => {
        try {
            const patientId = req.params["patient_id"]
            const [patients] = await database.execute(
                "SELECT first_name, last_name, contact_phone, contact_email, birthdate FROM patient WHERE patient_id = ?",
                [patientId])
            if (patients.length === 0) {
                return res.status(404).json({msg: `No patient with id ${patientId} found`})
            }
            return res.status(200).json({result: {patient: patients[0]}})
        } catch (err) {
            console.error(err)
            return res.status(500).json({err})
        }
    })

    return router
}
