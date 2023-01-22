import { Router } from 'express'
import { uploadCourse, uploadPage } from "../middlewares/multer.js"
import courseController from '../controllers/courseController.js'
import userController from '../controllers/userController.js'
import authCheck from '../middlewares/authCheck.js'
import roleCheck from '../middlewares/roleCheck.js'

const router = Router()

router.post('/login', userController.login)

router.post('/upload_course', roleCheck, uploadCourse, courseController.uploadCourse)
router.post('/upload_file', roleCheck, uploadPage)
router.get('/courses/:cn/:fn', authCheck, courseController.showPage)
router.get('/courses/:cn', authCheck, courseController.showCourse)
router.get('/courses', authCheck, courseController.showAllCourses)
router.delete('/courses/delete/:cn/:fn', roleCheck, courseController.deletePage)
router.delete('/courses/delete/:cn', roleCheck, courseController.deleteCourse)

export default router