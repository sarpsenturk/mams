import {Router} from "express";
import bcrypt from "bcrypt"
import {isAuthenticated} from "../middleware/is-authenticated.js";
import {isAdmin} from "../middleware/is-admin.js";
import {createWhereClause} from "../utils/create-where-clause.js";

export default (database) => {
    // Create staff router
    const router = Router()

    // Configuration
    const saltRounds = 10

    async function createUser({first_name, last_name, email, password}) {
        if (!first_name || !last_name || !email || !password) {
            throw Error("Missing required information to create user")
        }

        const hash = await bcrypt.hash(password, saltRounds)
        const [result] = await database.execute(
            "INSERT INTO staff (first_name, last_name, email, password, is_admin) VALUES (?, ?, ?, ?, false)",
            [first_name, last_name, email, Buffer.from(hash)])
        return result.insertId
    }

    // Setup staff routes
    router.post("/manager/create", isAuthenticated, isAdmin, async (req, res) => {
        try {
            // Validate manager data
            const {meeting_hours_begin, meeting_hours_end} = req.body
            if (!meeting_hours_begin || !meeting_hours_end) {
                return res.status(400).json({msg: "Missing required information to create manager"})
            }

            // Create the user
            const insertId = await createUser(req.body)

            // Create the manager
            await database.execute(
                "INSERT INTO manager (manager_id, meeting_hours_begin, meeting_hours_end) VALUES (?, ?, ?)",
                [insertId, meeting_hours_begin, meeting_hours_end])
            return res.status(201).json({result: {staffId: insertId}})
        } catch (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).json({msg: "Email is already in use"})
            }
            console.error(err)
            return res.status(500).json(err)
        }
    })

    router.post("/doctor/create", isAuthenticated, isAdmin, async (req, res) => {
        try {
            // Validate the doctor data
            const {room_number, employment_start, manager_id} = req.body
            if (!room_number || !employment_start || !manager_id) {
                return res.status(400).json({msg: "Missing required information to create doctor"})
            }

            // Create the user
            const insertId = await createUser(req.body)

            // Create the doctor
            await database.execute(
                "INSERT INTO doctor (doctor_id, room_number, employment_start, manager_id) VALUES (?, ?, ?, ?)",
                [insertId, room_number, employment_start, manager_id])
            return res.status(201).json({result: {staffId: insertId}})
        } catch (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).json({msg: "Email is already in use"})
            }
            console.error(err)
            return res.status(500).json(err)
        }
    })

    router.get("/search", isAuthenticated, isAdmin, async (req, res) => {
        const query = `SELECT staff_id, first_name, last_name, email, is_admin
                       FROM staff ${createWhereClause(req.query, database)}`
        try {
            const [result] = await database.query(query)
            return res.status(200).json({result})
        } catch (err) {
            console.error(err)
            return res.status(500).json(err)
        }
    })

    router.delete("/:staff_id", isAuthenticated, isAdmin, async (req, res) => {
        try {
            const patientId = req.params["staff_id"]
            if (!patientId) {
                return res.status(400).json({msg: "Missing staff ID"})
            }
            const [result] = await database.execute(
                'DELETE FROM staff WHERE staff_id = ?',
                [patientId])
            const status = result.rowsAffected === 0 ? 204 : 202
            return res.status(status).send()
        } catch (err) {
            console.error(err)
            return res.status(500).json({err})
        }
    })

    router.get("/doctor/from_name", isAuthenticated, async (req, res) => {
        const name = database.escape(`%${req.query['name']}%`)
        const query = `SELECT doctor_id, room_number, s.first_name, s.last_name
                       FROM doctor
                                INNER JOIN staff s ON doctor_id = s.staff_id
                       WHERE CONCAT(first_name, ' ', last_name) LIKE ${name}`
        try {
            const [result] = await database.query(query)
            return res.status(200).json({result})
        } catch (err) {
            console.error(err)
            return res.status(500).json(err)
        }
    })

    router.get("/manager/from_name", isAuthenticated, async (req, res) => {
        const name = database.escape(`%${req.query['name']}%`)
        const query = `SELECT manager_id, meeting_hours_begin, meeting_hours_end, s.first_name, s.last_name
                       FROM manager
                                INNER JOIN staff s ON manager.manager_id = s.staff_id
                       WHERE CONCAT(first_name, ' ', last_name) LIKE ${name}`
        try {
            const [result] = await database.query(query)
            return res.status(200).json({result})
        } catch (err) {
            console.error(err)
            return res.status(500).json(err)
        }
    })

    return router
}
