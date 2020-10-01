import express from 'express'
const router =express.Router();
import  checkAuth  from '../middleware/check-auth'
import contactController from '../controllers/contactsController'
router.post('/',contactController.save)
router.get('/',checkAuth,contactController.getall)
module.exports=router