import mongoose from 'mongoose'
import Profile from '../models/plofile'
export default class profileController{
    static async add(req,res){
        try{
            const plofile = new Profile({
                _id:new mongoose.Types.ObjectId(),
                email:req.body.email,
                tel:req.body.tel,
                home:req.body.home,
                userid:''
            
            });
            await plofile.save();
            return res.status(200).json({message:'added'});
        }catch(error){
           return  res.status(500).json({error:error.message});
        }
    }
    static async update(req,res){
        try{
            const id=res.userInfo._id;
            let fields={};
            let ob;
            for(ob of Object.entries(req.body)){
                fields[ob[0]]=ob[1];
            }
            
            await Profile.updateOne({userid:id},{$set:fields});
            return res.status(200).json({message:'plofile updated!'})
        }catch(error){
            return res.status(500).json({error:error.message});
        }
    }
    static async view(req,res){
        try{
            const profile =await Profile.findOne().select('email home tel').exec();
            return res.json({profile:profile})
        }catch(error){
            return res.status(500).json({error:error.message});
        }
    }
}