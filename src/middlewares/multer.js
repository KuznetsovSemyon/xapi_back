import multer from 'multer'
import path from 'path'
import fs from "fs"

const courseStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { courseName } = req.body
        if (!courseName)
            return cb(new Error("The course name not found"))

        const folderName = path.join('./courses', courseName)
        if (fs.existsSync(folderName))
            fs.rmdirSync(folderName, { recursive: true })
        fs.mkdirSync(folderName)
        cb(null, folderName)
    },

    filename: (req, file, cb) => {
        req.filename = file.originalname
        cb(null, file.originalname)
    }

});

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { courseName } = req.body
        if (!courseName)
            return cb(new Error("The course name required"))

        const folderName = path.join('./courses', courseName)
        if (!fs.existsSync(folderName))
            return cb(new Error("The course not found"))
        cb(null, folderName)
    },

    filename: (req, file, cb) => {
        req.filename = file.originalname
        cb(null, file.originalname)
    }

});

const fileFilter = (req, file, cb) => {
    const fileSize = +req.headers['content-length'];
    if (fileSize > 10 * 1024 * 1024) {
        const err = { error: true, message: 'max size of file is 10 mb' };
        return cb(new Error(err.message));
    }

    if (file.mimetype == 'application/xml' || file.mimetype == 'text/html' || file.mimetype == 'text/xml') {
        cb(null, true);
    }
    else {
        const err = { error: true, message: 'only xml and html file format allowed' };
        return cb(new Error(err.message));
    }
};

const courseFilter = (req, file, cb) => {
    const archiveSize = +req.headers['content-length'];
    if (archiveSize > 1024 * 1024 * 1024) {
        const err = { error: true, message: 'max size of all files is 1 gb' };
        return cb(new Error(err.message));
    }

    if (file.mimetype == 'application/zip') {
        cb(null, true);
    }
    else {
        const err = { error: true, message: 'only zip format allowed' };
        return cb(new Error(err.message));
    }
};

const courseUpload = multer({
    storage: courseStorage,
    fileFilter: courseFilter
});

const fileUpload = multer({
    storage: fileStorage,
    fileFilter: fileFilter
});

const uploadCourse = (req, res, next) => {
    const upload = courseUpload.fields([{ name: 'archv', maxCount: 1}, { name: 'courseName', maxCount: 1 }])

    upload(req, res, err => {
        if (err) {
            return res.status(400).json({ error: true, message: err.message });
        }
        next();
    })
}

const uploadFile = (req, res) => {
    const upload = fileUpload.fields([{ name: 'file', maxCount: 1}, { name: 'courseName', maxCount: 1 }])

    upload(req, res, err => {
        if (err) {
            return res.status(400).json({ error: true, message: err.message });
        }
        return res.status(200).json({ message: 'File has been upload successfully' });
    })
}

export { uploadCourse, uploadFile }