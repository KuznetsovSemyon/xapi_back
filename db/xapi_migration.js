//import User from './schemas/UserSchema.js'
//import Role from './schemas/RoleSchema.js'
//import RoleSchema from "./schemas/RoleSchema.js";
//import UserSchema from "./schemas/UserSchema.js";
import { User, Role } from './connection.js'

const xapi_migration = async () => {
    try {
        const teacherRole = new Role({ value: "teacher" })
        const studentRole = new Role({ value: "student" })
        const teacherUser = new User({ login: "teacher", role: "teacher", password: "teacher" })
        const studentUser = new User({ login: "student", role: "student", password: "student" })

        await teacherRole.save(function (err) {
            if (err) return console.error(err);
            console.log("teacher saved to role collection.");
        })
        await studentRole.save(function (err) {
            if (err) return console.error(err);
            console.log("student saved to role collection.");
        })
        await teacherUser.save(function (err) {
            if (err) return console.error(err);
            console.log("teacher saved to user collection.");
        })
        await studentUser.save(function (err) {
            if (err) return console.error(err);
            console.log("student saved to user collection.");
        })
    } catch (e) {
        console.log(e)
    }
}

export default xapi_migration
