import {Router} from "express";
import bcrypt from "bcrypt"
import {isAuthenticated} from "../middleware/is-authenticated.js";
import {isAdmin} from "../middleware/is-admin.js";

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
    router.get("/", (req, res) => {
        return res.status(200).send("Hello from /staff")
    })

    router.post("/manager/create", isAuthenticated, isAdmin, async (req, res) => {
        try {
            // Validate manager data
            const {meeting_hours_begin, meeting_hours_end} = req.body
            if (!meeting_hours_begin || !meeting_hours_end) {
                return res.status(400).json({err: "Missing required information to create manager"})
            }

            // Create the user
            const insertId = await createUser(req.body)

            // Create the manager
            await database.execute(
                "INSERT INTO manager (manager_id, meeting_hours_begin, meeting_hours_end) VALUES (?, ?, ?)",
                [insertId, meeting_hours_begin, meeting_hours_end])
            return res.status(201).json({result: {staffID: insertId}})
        } catch (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).json({err: "Email is already in use"})
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
                return res.status(400).json({err: "Missing required information to create doctor"})
            }

            // Create the user
            const insertId = await createUser(req.body)

            // Create the doctor
            await database.execute(
                "INSERT INTO doctor (doctor_id, room_number, employment_start, manager_id) VALUES (?, ?, ?, ?)",
                [insertId, room_number, employment_start, manager_id])
            return res.status(201).json({result: {staffID: insertId}})
        } catch (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).json({err: "Email is already in use"})
            }
            console.error(err)
            return res.status(500).json(err)
        }
    })

    router.get("/manager/:manager_id", isAuthenticated, async (req, res) => {
        try {
            const managerId = req.params["manager_id"]
            const [result] = await database.execute(
                "SELECT staff.first_name, staff.last_name, staff.email," +
                "manager.meeting_hours_begin, manager.meeting_hours_end FROM staff " +
                "INNER JOIN manager ON staff.staff_id = manager.manager_id WHERE staff.staff_id = ?", [managerId])
            if (result.length === 0) {
                return res.status(404).json({err: `Manager with id ${managerId} not found`})
            }
            return res.status(200).json({result: {manager: result[0]}})
        } catch (err) {
            console.error(err)
            return res.status(500).json({err})
        }
    })

    router.get("/doctor/:doctor_id", isAuthenticated, async (req, res) => {
        try {
            const doctorId = req.params["doctor_id"]
            const [result] = await database.execute(
                "SELECT staff.first_name, staff.last_name, staff.email, " +
                "doctor.room_number, doctor.employment_start, doctor.manager_id FROM staff " +
                "INNER JOIN doctor ON staff.staff_id = doctor.doctor_id WHERE staff.staff_id = ?", [doctorId])
            if (result.length === 0) {
                return res.status(404).json({err: `Doctor with id ${doctorId} not found`})
            }
            return res.status(200).json({result: {manager: result[0]}})
        } catch (err) {
            console.error(err)
            return res.status(500).json({err})
        }
    })

    return router
}
