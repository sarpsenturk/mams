import express from 'express'
import api from "./rotues/api.js";

// Configuration
const PORT = process.env.PORT | 8000

// Create the application
const app = express()

// Set up /api route
app.use("/api", api())

// Listen on specified port
app.listen(PORT, () => {
    console.log(`MAMS backend listening on port ${PORT}...`)
})
