import User from '../../db/models/User.js'
import jwt from 'jsonwebtoken'

const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role
    }
    return jwt.sign(payload, 'secret_key', {expiresIn: "24h"})
}

class AuthController {

    async login(req, res) {
        try {
            const { login, password } = req.body;
            if (!login)
                return res.status(400).json({ error: true, message: "login required" });
            if (!password)
                return res.status(400).json({ error: true, message: "password required" });

            let user = await User.findOne({ login });

            if (!user)
                return res.status(404).json({ error: true, message: "user not found" });
            if (user.password !== password)
                return res.status(400).json({ error: true, message: "incorrect password" });

            const token = generateAccessToken(user._id, user.role)
            res.status(200).json({ token });
        }
        catch (e) {
            res.status(400).json({ error: true, message: e.message || e });
        }
    }
}

export default new AuthController()