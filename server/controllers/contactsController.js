import mongoose from 'mongoose'
import Queries from '../models/queries'
export default class {
    static async save(req,res){
        try {
            const message= new Queries({
                _id:new mongoose.Types.ObjectId(),
                name:req.body.name,
                email:req.body.email,
                message:req.body.message
            })
            await message.save();
            return res.status(201).json({message:'Your message well received'});
        } catch (error) {
            return res.status(500).json({error:error.message});
        }
    }
    static async getall(req,res){
        try {
            const docs= await Queries.find().select("message email name").exec();
            
            return res.status(200).json({queries:docs});
        } catch (error) {
            return res.status(500).json({error:error.message});
        }
    }
}
