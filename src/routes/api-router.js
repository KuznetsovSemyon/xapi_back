import { Router } from 'express'
import { uploadCourse, uploadFile } from "../middlewares/multer.js"
import courseController from '../controllers/courseController.js'
import authController from '../controllers/authController.js'
import authCheck from '../middlewares/authCheck.js'
import roleCheck from '../middlewares/roleCheck.js'

const router = Router()

router.post('/login', authController.login)

router.post('/upload_course', roleCheck, uploadCourse, courseController.extract)
router.post('/upload_file', roleCheck, uploadFile)
router.get('/courses/:cn/:fn', authCheck, courseController.getFile)
router.get('/courses/:cn', authCheck, courseController.getAllFiles)
router.get('/courses', authCheck, courseController.getAllCourses)
router.delete('/courses/delete/:cn/:fn', roleCheck, courseController.deleteFile)
router.delete('/courses/delete/:cn', roleCheck, courseController.deleteCourse)

export default router