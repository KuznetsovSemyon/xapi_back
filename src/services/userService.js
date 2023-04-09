import { User } from '../../db/connection.js'
import jwt from 'jsonwebtoken'

const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role
    }
    return jwt.sign(payload, 'secret_key', {expiresIn: "24h"})
}

class UserService {
        async login(login, password) {
            try {
                let user = await User.findOne({ login });

                if (!user)
                    return new Error("user not found");
                if (user.password !== password)
                    return new Error("incorrect password");

                const token = generateAccessToken(user._id, user.role)

                return token
            } catch (e) {
                throw new Error(e)
            }
        }
}

export default new UserService()