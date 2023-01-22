import courseService from "../services/courseService.js";

class CourseController {

    async uploadCourse(req, res) {
        try {
            const path = req.files.archv[0].path
            const destination = req.files.archv[0].destination

            await courseService.uploadCourse(path, destination)

            res.status(200).json({ message: 'Course has been upload successfully' })
        } catch (e) {
            res.status(400).json({ error: true, message: e.message || e })
        }
    }

    showPage(req, res) {
       try {
           const { cn, fn } = req.params
           if(!cn)
               return res.status(400).json({ error: true, message: "Course name required" })
           if(!fn)
               return res.status(400).json({ error: true, message: "File name required" })

           const file = courseService.showPage(cn, fn)
           if (file.message)
               res.status(400).json({ error: true, message: file.message || file })

           res.download(file)
       } catch (e) {
           res.status(400).json({ error: true, message: e.message || e })
       }
    }

    showAllCourses(req, res) {
        try {
            const courseNames = courseService.showAllCourses()
            if (courseNames.message)
                res.status(400).json({ error: true, message: courseNames.message || courseNames })

            res.status(200).json(courseNames)
        } catch (e) {
            res.status(400).json({ error: true, message: e.message || e })
        }
    }

    showCourse(req, res) {
        try {
            const { cn } = req.params
            if(!cn)
                return res.status(400).json({ error: true, message: "Course name required" })

            const fileList = courseService.showCourse(cn)
            if (fileList.message)
                res.status(400).json({ error: true, message: fileList.message || fileList })

            res.status(200).json(fileList)
        } catch (e) {
            res.status(400).json({ error: true, message: e.message || e })
        }
    }

    deletePage(req, res) {
        try {
            const { cn, fn } = req.params
            if(!cn)
                return res.status(400).json({ error: true, message: "Course name required" })
            if(!fn)
                return res.status(400).json({ error: true, message: "File name required" })

            const file = courseService.deletePage(cn, fn)
            if (file.message)
                res.status(400).json({ error: true, message: file.message || file })

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

            const course = courseService.deleteCourse(cn)
            if (course.message)
                res.status(400).json({ error: true, message: course.message || course })

            res.status(200).json({ deleted: course })
        } catch (e) {
            res.status(400).json({ error: true, message: e.message || e })
        }
    }
}

export default new CourseController()