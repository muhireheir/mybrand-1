import express from 'express'
const router = express.Router()
import userController from '../controllers/userControler'
router.post('/signup',userController.createUser)




module.exports = router