import express from 'express'
const router = express.Router()
import blogController from '../controllers/blogController'
import imgUploader from '../helpers/uploader'
router.post('/', imgUploader, blogController.add)


module.exports = router