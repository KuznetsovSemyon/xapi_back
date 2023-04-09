import axios from "axios"
import FormData from "form-data"
import ClientLrsSchema from "../../db/schemas/ClientLrsSchema.js";
import mongoose from 'mongoose'
import { ClientLrs, lrs_conn, database } from '../../db/connection.js'

class LrsService {
    async createUser(UserLrs) {
        try {
            /*let registerFormData = new FormData()
            registerFormData.append('name','admin')
            registerFormData.append('email','admin@admin.ru')
            registerFormData.append('password','44c911935680b9e9535e8af1d017767f65619ef4')
            registerFormData.append('password_confirmation','44c911935680b9e9535e8af1d017767f65619ef4')*/

            /*await axios({
                method: 'post',
                url: 'http://lrs:80/register',
                data: registerFormData,
                headers: { "Content-Type": "multipart/form-data" }
            })*/

            /*let loginFormData = new FormData()
            loginFormData.append('email','admin@admin.ru')
            loginFormData.append('password','44c911935680b9e9535e8af1d017767f65619ef4')

            const loginResponse = await axios({
                method: 'post',
                url: 'http://lrs:80/login',
                data: loginFormData,
                headers: { "Content-Type": "multipart/form-data" }
            })

            const rawHtml = loginResponse
            console.log(rawHtml)
            const handler = new htmlparser.DefaultHandler(function (err, dom) {
                if (err)
                    return console.error(err)
                else {
                    const subStringToken = dom[2].children[3].children[1].children[1]
                        .children[3].children[3].children[0].data
                    process.env.X_CSRF_TOKEN = subStringToken.substring(41, subStringToken.length - 1)

                    const subStringCookie = loginResponse.headers['set-cookie'][0]
                    process.env.COOKIE = subStringCookie
                    //const index = subStringCookie.indexOf(";")
                    //console.log(subStringCookie)
                    //process.env.COOKIE = subStringCookie.substring(0, index)
                }
            })
            const parser = new htmlparser.Parser(handler)
            parser.parseComplete(rawHtml)*/

            /*let user = await UserLrs.findOneAndUpdate({ email: 'admin@admin.ru'}, { verified: 'yes'})
            if (!user) return console.error('User not found')
            console.log("LRS user has been created")*/

            /*user._doc.verified = 'yes'
            user.markModified('_doc.verified')
            await user.save()*/
            /*const X_CSRF_TOKEN = process.env.X_CSRF_TOKEN
            const COOKIE =  process.env.COOKIE
            console.log(user._id.toString())*/
            //console.log(X_CSRF_TOKEN)
            //console.log(COOKIE)

            /*await axios({
                method: 'put',
                url: `http://lrs:80/site/users/verify/${user._id}`,
                headers: {
                    "Cookie": COOKIE,
                    "X-CSRF-Token": X_CSRF_TOKEN,
                    "X-Requested-With": "XMLHttpRequest"
                }
            })*/
        } catch (e) {
            console.log(e)
            return new Error(e)
        }
    }

    async createLRS() {
        try {
            /*let loginFormData = new FormData()
            loginFormData.append('email','admin@admin.ru')
            loginFormData.append('password','44c911935680b9e9535e8af1d017767f65619ef4')

            const loginResponse = await axios({
                method: 'post',
                url: 'http://lrs:80/login',
                data: loginFormData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Connection": "keep-alive"
                }
            })
            console.log(loginResponse.headers)
            console.log(loginResponse.data)

            process.env.COOKIE = loginResponse.headers['set-cookie'][0]

            const rawHTML = loginResponse.data
            const handler = new htmlparser.DefaultHandler(function (err, dom) {
                if (err)
                    return console.error(err)
                else {
                    //console.log(dom[2])
                    const subStringToken = dom[2].children[3].children[1].children[1]
                        .children[3].children[3].children[0].data
                    process.env.X_CSRF_TOKEN = subStringToken.substring(41, subStringToken.length - 1)
                    console.log(process.env.X_CSRF_TOKEN)
                }
            })
            const parser = new htmlparser.Parser(handler)
            parser.parseComplete(rawHTML)

            let LRSFormData = new FormData()
            LRSFormData.append('_token', process.env.X_CSRF_TOKEN)
            LRSFormData.append('title','MyLRS')
            LRSFormData.append('description','')

            const resLRS = await axios({
                method: 'post',
                url: 'http://lrs:80/lrs',
                data: LRSFormData,
                headers: {
                    "Cookie": process.env.COOKIE,
                    "Content-Type": "multipart/form-data",
                    "Connection": "keep-alive"
                }
            })

            console.log(resLRS.headers)
            console.log(resLRS.data)
*/
        } catch (e) {
            console.log(e)
            return new Error(e)
        }
    }

    async getClientInfo(name) {
        try {
            //let user = await ClientLrs.findOne({ authority: { name, mbox: "mailto:hello@learninglocker.net" } })
            const client = database.collection("client");

            let user = await client.findOne({ authority: { name, mbox: "mailto:hello@learninglocker.net" } })
            return user
        } catch (e) {
            console.log(e)
            return new Error(e)
        }
    }
}

export default new LrsService()