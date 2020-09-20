import express from 'express'
const router =express.Router();
import contactController from '../controllers/contactsController'
router.post('/',contactController.save)
module.exports=router