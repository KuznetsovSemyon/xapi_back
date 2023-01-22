import userService from "../services/userService.js";

class UserController {

    async login(req, res) {
        try {
            const { login, password } = req.body;
            if (!login)
                return res.status(400).json({ error: true, message: "login required" });
            if (!password)
                return res.status(400).json({ error: true, message: "password required" });

            let token = await userService.login(login, password);

            res.status(200).json({ token });
        }
        catch (e) {
            res.status(400).json({ error: true, message: e.message || e });
        }
    }
}

export default new UserController()