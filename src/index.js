import cors from 'cors'
import express from "express"
import apiRouter from './routes/api-router.js'
import { createServer } from "http"
import mongoose from 'mongoose'
import migration from '../db/migration.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL

async function connection() {
    try {
        mongoose.Promise = global.Promise;
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        const db = await mongoose.connection;
        await db.on('error', console.error.bind(console, 'connection error:'));
        await db.once('open', migration())
    } catch (e) {
        console.log(e)
    }
}

await connection()

const httpServer = createServer(app);

app.use(cors())
app.options('*', cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', apiRouter)
app.use("*", (req, res) => {
    res.status(404).send("Not Found 404")
})

httpServer.listen(PORT, () => console.log("server run on port  " + PORT))