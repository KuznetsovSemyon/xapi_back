import fs from 'fs'
import path from "path";
import decompress from "decompress"

class CourseService {
    async uploadCourse(path, destination) {
        try {
            await decompress(path, destination)
            fs.unlinkSync(path)
        } catch (e) {
            return new Error(e)
        }
    }

    showPage(cn, fn) {
        try {
            const file = path.join('./courses', cn, fn)
            if (!fs.existsSync(file) || !fs.lstatSync(file).isFile())
                return new Error("File not found")

            return file
        } catch (e) {
            return new Error(e)
        }
    }

    showCourse(cn) {
        try {
            const course = path.join('./courses', cn)

            if (!fs.existsSync(course) || !fs.lstatSync(course).isDirectory())
                return new Error("Course not found")

            return fs.readdirSync(course, { withFileTypes: true })
        } catch (e) {
            return new Error(e)
        }
    }

    showAllCourses() {
        try {
            const list = fs.readdirSync('./courses', { withFileTypes: true })
            const courseNames = list.filter(el => fs.lstatSync(`./courses/${el.name}`).isDirectory())
            return courseNames
        } catch (e) {
            return new Error(e)
        }
    }

    deletePage(cn, fn) {
        try {
            const file = path.join('./courses', cn, fn)

            if (!fs.existsSync(file) || !fs.lstatSync(file).isFile())
                return new Error("File not found")

            fs.unlinkSync(file)

            return file
        } catch (e) {
            return new Error(e)
        }
    }

    deleteCourse(cn) {
        try {
            const course = path.join('./courses', cn)

            if (!fs.existsSync(course) || !fs.lstatSync(course).isDirectory())
                return new Error("Course not found")

            fs.rmSync(course, { recursive: true })

            return course
        } catch (e) {
            return new Error(e)
        }
    }
}

export default new CourseService()