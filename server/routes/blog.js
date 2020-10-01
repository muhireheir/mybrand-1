import express  from 'express'
const router= express.Router()
import blogController from '../controllers/blogController'
import  checkAuth  from '../middleware/check-auth'
import multer from 'multer'
import singleBlog from '../middleware/singleBlog'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now()+file.originalname)
    }
  })
const upload = multer({ storage: storage })
router.get('/',blogController.getall)
router.post('/',checkAuth,upload.single('image'),blogController.add)
router.patch('/:id',checkAuth,singleBlog,blogController.updateBlog)
router.get('/:id', singleBlog,blogController.oneBlog)
router.delete('/:id',checkAuth,singleBlog,blogController.deleteBlog)
router.post('/:id/comment',checkAuth,singleBlog,blogController.addcomment)











module.exports=router