// defining || creating routes for public users aka visotors

const express = require("express")
const router =express.Router();

// importing Controllers
const signInController =require('../contollers/signInController')

// defining routes
// Signin Route
router.post('/signin',signInController.signIn);
module.exports=router;