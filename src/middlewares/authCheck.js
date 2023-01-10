import jwt from 'jsonwebtoken'

const authCheck = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({ error: true, message: "authorization required" });
        }
        const decodedData = jwt.verify(token, 'secret_key')
        req.user = decodedData
        next()
    } catch (e) {
        return res.status(403).json({ error: true, message: "authorization required" });
    }
}

export default authCheck