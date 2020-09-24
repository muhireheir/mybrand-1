import express from 'express'
const router = express.Router()
import blogController from '../controllers/blogController'
import imgUploader from '../helpers/uploader'
import singleBlog from '../middleware/singleBlog'

router.post('/', imgUploader, blogController.add)
router.get('/',blogController.getall)
router.get('/:id', singleBlog,blogController.oneBlog)


module.exports = router
