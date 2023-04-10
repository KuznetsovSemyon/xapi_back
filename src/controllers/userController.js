import userService from "../services/userService.js";
import lrsService from "../services/lrsService.js";

class UserController {

    async login(req, res) {
        try {
            const { login, password } = req.body;
            if (!login)
                return res.status(400).json({ error: true, message: "login required" });
            if (!password)
                return res.status(400).json({ error: true, message: "password required" });

            let token = await userService.login(login, password);
            if (token instanceof Error)
                res.status(400).json({ error: true, message: token.message || token });;

            const clientInfo = await lrsService.getClientInfo(login);
            res.status(200).json({ token, clientInfo });
        }
        catch (e) {
            res.status(400).json({ error: true, message: e.message || e });
        }
    }
}

export default new UserController()