 import express from 'express'
 const router =express.Router()
 import profileController from '../controllers/profileController'
 import checkAuth from '../middleware/check-auth'

// router.post('/save',checkAuth,profileController.add)
router.patch('/update',checkAuth,profileController.update)
router.get('/',profileController.view)


 module.exports=router