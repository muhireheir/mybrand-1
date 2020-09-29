import mongoose from 'mongoose'
import Queries from '../models/queries'
export default class {
    static async save(req,res){
        try {
            const message= new Queries({
                _id:new mongoose.Types.ObjectId(),
                name:req.body.email,
                email:req.body.email,
                message:req.body.message
            })
            await message.save()
            res.status(201).json({message:'Your message well received'})
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }
}