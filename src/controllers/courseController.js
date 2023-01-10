import fs from 'fs'
import path from "path";
import decompress from "decompress"

class CourseController {

    async extract(req, res) {
        try {
            const path = req.files.archv[0].path
            const destination = req.files.archv[0].destination

            await decompress(path, destination)

            fs.unlinkSync(path)

            res.status(200).json({ message: 'Course has been upload successfully' })
        } catch (e) {
            res.status(400).json({ error: true, message: e.message || e })
        }
    }

    getFile(req, res) {
       try {
           const { cn, fn } = req.params
           if(!cn)
               return res.status(400).json({ error: true, message: "Course name required" })
           if(!fn)
               return res.status(400).json({ error: true, message: "File name required" })

           const file = path.join('./courses', cn, fn)
           if (!fs.existsSync(file) || !fs.lstatSync(file).isFile())
               return res.status(400).json({ error: true, message: "File not found" })

           res.download(file)
       } catch (e) {
           res.status(400).json({ error: true, message: e.message || e })
       }
    }

    getAllCourses(req, res) {
        try {
            const courseNames = fs.readdirSync('./courses', { withFileTypes: true })

            res.status(200).json(courseNames)
        } catch (e) {
            res.status(400).json({ error: true, message: e.message || e })
        }
    }

    getAllFiles(req, res) {
        try {
            const { cn } = req.params
            if(!cn)
                return res.status(400).json({ error: true, message: "Course name required" })

            const course = path.join('./courses', cn)

            if (!fs.existsSync(course) || !fs.lstatSync(course).isDirectory())
                return res.status(400).json({ error: true, message: "Course not found" })

            const fileList = fs.readdirSync(course, { withFileTypes: true })

            res.status(200).json(fileList)
        } catch (e) {
            res.status(400).json({ error: true, message: e.message || e })
        }
    }

    deleteFile(req, res) {
        try {
            const { cn, fn } = req.params
            if(!cn)
                return res.status(400).json({ error: true, message: "Course name required" })
            if(!fn)
                return res.status(400).json({ error: true, message: "File name required" })

            const file = path.join('./courses', cn, fn)

            if (!fs.existsSync(file) || !fs.lstatSync(file).isFile())
                return res.status(400).json({ error: true, message: "File not found" })

            fs.unlinkSync(file)
            res.status(200).json({ deleted: file })
        } catch (e) {
            res.status(400).json({ error: true, message: e.message || e })
        }
    }

    deleteCourse(req, res) {
        try {
            const { cn } = req.params
            if(!cn)
                return res.status(400).json({ error: true, message: "Course name required" })
            const course = path.join('./courses', cn)

            if (!fs.existsSync(course) || !fs.lstatSync(course).isDirectory())
                return res.status(400).json({ error: true, message: "Course not found" })

            fs.rmSync(course, { recursive: true })
            res.status(200).json({ deleted: course })
        } catch (e) {
            res.status(400).json({ error: true, message: e.message || e })
        }
    }
}

export default new CourseController()