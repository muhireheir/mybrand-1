import express from 'express'
const router = express.Router()
import blogController from '../controllers/blogController'
import multer from 'multer'
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({ storage: storage })
router.post('/new', upload.single('image'), blogController.add)












module.exports = router