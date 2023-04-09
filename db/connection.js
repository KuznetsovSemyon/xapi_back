import mongoose from "mongoose";
import RoleSchema from "./schemas/RoleSchema.js";
import UserSchema from "./schemas/UserSchema.js";
import xapi_migration from "./xapi_migration.js";
import ClientLrsSchema from "./schemas/ClientLrsSchema.js";
import mongodb from "mongodb"

const client = new mongodb.MongoClient("mongodb://mongo:27017/");
await client.connect()
const database = client.db("lrs_db");

const xapi_conn = mongoose.createConnection(process.env.XAPI_DB_URL)
const Role = xapi_conn.model('Role', RoleSchema)
const User = xapi_conn.model('User', UserSchema)
xapi_conn.on('error', console.error.bind(console, 'connection error:'))
xapi_conn.once('open', () => xapi_migration())

const lrs_conn = await mongoose.createConnection(process.env.LRS_DB_URL)
const ClientLrs = lrs_conn.model('client', ClientLrsSchema)
lrs_conn.on('error', console.error.bind(console, 'connection error:'))

/*const lrs_conn = mongoose.createConnection(LRS_DB_URL)
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
})*/
/*mongoose.Promise = global.Promise;
await mongoose.connect(XAPI_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = await mongoose.connection;
await db.on('error', console.error.bind(console, 'connection error:'));
await db.once('open', xapi_migration())*/

export { User, Role, ClientLrs, lrs_conn, database }