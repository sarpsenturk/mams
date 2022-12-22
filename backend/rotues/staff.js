import {Router} from "express";
import bcrypt from "bcrypt"

export default (database) => {
    // Create staff router
    const router = Router()

    // Configuration
    const saltRounds = 10

    async function createUser({first_name, last_name, email, password}) {
        const hash = await bcrypt.hash(password, saltRounds)
        const [result] = await database.execute(
            "INSERT INTO staff (first_name, last_name, email, password, is_admin) VALUES (?, ?, ?, ?, false)",
            [first_name, last_name, email, Buffer.from(hash)])
        return result
    }

    // Setup staff routes
    router.get("/", (req, res) => {
        return res.status(200).send("Hello from /staff")
    })

    router.post("/manager/create", async (req, res) => {
        try {
            // Create the user
            const {insertID} = await createUser(req.body)

            // Create the manager
            const {meeting_hours_begin, meeting_hours_end} = req.body
            if (!meeting_hours_begin || !meeting_hours_end) {
                return res.status(400).json({err: "Missing required information"})
            }
            await database.execute(
                "INSERT INTO manager (manager_id, meeting_hours_begin, meeting_hours_end) VALUES (?, ?, ?)",
                [insertID, meeting_hours_begin, meeting_hours_end])
            return res.status(201).json({result: {staffID: insertID}})
        } catch (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).json({err: "Email is already in use"})
            }
            console.error(err)
            return res.status(500).json(err)
        }
    })

    router.post("/doctor/create", async (req, res) => {
        try {
            // Create the user
            const {insertID} = await createUser(req.body)
            const {room_number, employment_start, manager_id} = req.body
            await database.execute(
                "INSERT INTO doctor (doctor_id, room_number, employment_start, manager_id) VALUES (?, ?, ?, ?)",
                [insertID, room_number, Date.parse(employment_start), manager_id])
            return res.status(201).json({result: {staffID: insertID}})
        } catch (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).json({err: "Email is already in use"})
            }
            console.error(err)
            return res.status(500).json(err)
        }
    })

    return router
}
