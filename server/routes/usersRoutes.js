import express from 'express'
import emailChecker from '../helpers/email.js'
const router = express.Router()

import userController from '../controllers/userControler'
router.post('/register',emailChecker,userController.createUser)
router.post('/login',emailChecker,userController.login)



module.exports = router