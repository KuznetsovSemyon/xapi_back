import lrsService from "../services/lrsService.js";

class LrsController {
    async getClientInfo(req, res) {
        try {
            const { name } = req.params
            if(!name)
                return res.status(400).json({ error: true, message: "Client name required" })

            const clientInfo = await lrsService.getClientInfo(name)

            res.status(200).json(clientInfo)
        } catch (e) {
            res.status(400).json({ error: true, message: e.message || e })
        }
    }
}

export default new LrsController()