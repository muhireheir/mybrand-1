import express from 'express'
const router = express.Router()
import blogController from '../controllers/blogController'
import imgUploader from '../helpers/uploader'
router.post('/', imgUploader, blogController.add)
router.get('/',blogController.getall)


module.exports = router