import User from '../models/userModel'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
export default class usersController {
    // creating  user
    static async createUser(req, res) {
        try{
           const result = await User.findOne({ email: req.body.email });
            if (result) {
                return res.status(409).json({ error: 'Email used' });
            } else {
               
                 bcrypt.hash(req.body.password, 10, async(err, hash) => {
                    if (err) {
                        throw err;
                    } else {
                        const NewUser = new User({
                            _id:new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        });
                        const resp = await NewUser.save();
                            const token = jwt.sign({
                                email: resp.email,
                                adminRole: resp.adminRole,
                                _id:resp._id
                            }, process.env.JWT_KEY, { expiresIn: "1h" })
                            return res.status(201).json({ message: "registered!", token: token });
                        
                    }
                });
            }
        

        }catch(error){
            
           return res.status(500).json({ error: error.message });
        

        }

    }
    // logging user  in
    static async login(req,res){
        try{
              const user= await User.findOne({email:req.body.email}).exec();
            
            if(user){
                bcrypt.compare(req.body.password,user.password,async(err,result)=>{
                    if(result){
                        const token = jwt.sign({
                            email: user.email,
                            adminRole: user.adminRole,
                            _id:user._id
                        }, process.env.JWT_KEY, { expiresIn: "1h" });
                        return res.status(200).json({ message: "loggedIn!",adminRole: user.adminRole, token: token });
                       
                    }else{
                        return res.status(401).json({ error: 'Invalid cridential'});
                    }
                });
            }else{
               return res.status(401).json({ error: 'Invalid cridential'});
            }
        

        }catch(error){

            return res.status(500).json({ error: error.message });

        }
      
    }
}