import express from 'express'

// Configuration
const PORT = process.env.PORT | 8000

// Create the application
const app = express()

// Listen on specified port
app.listen(PORT, () => {
    console.log(`MAMS backend listening on port ${PORT}...`)
})
