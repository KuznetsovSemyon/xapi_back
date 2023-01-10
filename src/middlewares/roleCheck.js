import jwt from 'jsonwebtoken'

const roleCheck = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({ error: true, message: "authorization required" });
        }
        const { role } = jwt.verify(token, 'secret_key')
        if (role !== 'teacher')
            return res.status(403).json({ error: true, message: "forbidden" });
        next()
    } catch (e) {
        return res.status(403).json({ error: true, message: "authorization required" });
    }
}

export default roleCheck