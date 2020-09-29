import User from '../models/userModel'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
export default class usersController {
    // creating  user
    static createUser(req, res) {
        User.findOne({ email: req.body.email }).then(result => {
            if (result) {
                res.status(409).json({ error: 'Email used' })
            } else {
               

                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json({ error: err })
                    } else {
                        const NewUser = new User({
                            _id:new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        })
                        NewUser.save().then(resp => {
                            console.log(resp._id)
                            const token = jwt.sign({
                                email: resp.email,
                                adminRole: resp.adminRole,
                                _id:resp._id
                            }, process.env.JWT_KEY, { expiresIn: "1h" })
                            res.status(201).json({ message: "registered!", token: token })
                        }).catch(error => {
                            res.status(500).json({ error: errors })
                        })
                    }
                })
            }
        }).catch(error => {
            res.status(500).json({ error: error })
        })
    }
    // logging user  in
    static login(req,res){
        User.findOne({email:req.body.email}).exec().then(user=>{
            
            if(user){
                bcrypt.compare(req.body.password,user.password,(err,result)=>{
                    console.log('error:'+err)
                    console.log('result:'+result)
                    if(result){
                        const token = jwt.sign({
                            email: user.email,
                            adminRole: user.adminRole,
                            _id:user._id
                        }, process.env.JWT_KEY, { expiresIn: "1h" })
                        res.status(200).json({ message: "loggedIn!",adminRole: user.adminRole, token: token })
                        console.log(result)
                    }else{
                        res.status(401).json({ error: 'Invalid cridential'})
                    }
                })
            }else{
                res.status(401).json({ error: 'Invalid cridential'})
            }
        }).catch(error=>{
            res.status(500).json({ error: error })
        })
    }
}