import cors from 'cors'
import express from "express"
import apiRouter from './routes/api-router.js'
import { createServer } from "http"
import mongoose from 'mongoose'
import RoleSchema from '../db/schemas/RoleSchema.js'
import UserSchema from '../db/schemas/UserSchema.js'
import UserLrsSchema from "../db/schemas/UserLrsSchema.js"
import xapi_migration from '../db/xapi_migration.js'
import lrsService from "./services/lrsService.js"
import dotenv from 'dotenv'
import connection from '../db/schemas/UserSchema.js'
dotenv.config()

const app = express();
const PORT = process.env.PORT || 4000;

/*async function connection() {
    try {
        const xapi_conn = mongoose.createConnection(XAPI_DB_URL)
        const Role = xapi_conn.model('Role', RoleSchema)
        const User = xapi_conn.model('User', UserSchema)
        xapi_conn.on('error', console.error.bind(console, 'connection error:'))
        xapi_conn.once('open', () => xapi_migration(Role, User))

        const lrs_conn = mongoose.createConnection(LRS_DB_URL)
        const UserLrs = lrs_conn.model('User', UserLrsSchema)
        lrs_conn.on('error', console.error.bind(console, 'connection error:'))
        lrs_conn.once('open', async () => {
            restore({
                uri: LRS_DB_URL,
                root: "../db/lrs_db",
                callback: (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('finish');
                    }
                }
            });
            //await lrsService.createUser(UserLrs)
            //await lrsService.createLRS()
        })
        mongoose.Promise = global.Promise;
        await mongoose.connect(XAPI_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        const db = await mongoose.connection;
        await db.on('error', console.error.bind(console, 'connection error:'));
        await db.once('open', xapi_migration())
    } catch (e) {
        console.log(e)
    }
}*/

//await connection()

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