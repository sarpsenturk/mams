import {Router} from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import {isAuthenticated} from "../middleware/is-authenticated.js";

export default (database) => {
    // Create auth router
    const router = Router()

    // Configuration
    const token_secret = process.env.TOKEN_SECRET
    if (!token_secret) {
        throw Error("Authentication configuration is not set up. Please set TOKEN_SECRET in .env")
    }

    // Helper functions
    function generateToken(user) {
        return jwt.sign(user, token_secret, {expiresIn: "7d"})
    }

    async function getStaff(email) {
        const [staff] = await database.execute("SELECT * FROM staff where email = ?", [email])
        return staff
    }

    // auth routes
    router.post("/login", async (req, res) => {
        try {
            const {email, password} = req.body
            if (!email || !password) {
                return res.status(400).json({err: "Missing required credentials"})
            }

            // Find staff
            const staff = await getStaff(email)
            if (staff.length === 0) {
                return res.status(401).json({err: "Invalid email or password"})
            }
            const selectedStaff = staff[0]

            // Check password
            const passwordMatch = await bcrypt.compare(password, Buffer.from(selectedStaff.password).toString());
            if (!passwordMatch) {
                return res.status(401).json({err: "Invalid email or password"})
            }

            // Generate token
            const token = generateToken(selectedStaff)
            return res.status(200).json({result: {token}})
        } catch (err) {
            console.error(err)
            return res.status(500).json(err)
        }
    })

    router.get("/self", isAuthenticated, (req, res) => {
        return res.status(200).json({result: {user: req.user}});
    })

    return router
}
