export function isDoctor(database) {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({err: "User is not authenticated]"})
        }

        try {
            const [doctors] = await database.execute("SELECT doctor_id FROM doctor WHERE doctor_id = ?", [req.user["staff_id"]])
            if (doctors.length === 0) {
                return res.status(401).json({err: "User is not a doctor"})
            }
            req.user.doctorId = doctors[0].doctorId
            next()
        } catch (err) {
            console.error(err)
            return res.status(500).json({err})
        }
    }
}