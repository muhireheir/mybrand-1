import express from 'express'
const router = express.Router()
import userController from '../controllers/userControler'
router.post('/create',userController.createUser)
router.post('/login',userController.login)



module.exports = router