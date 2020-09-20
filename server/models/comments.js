import mongoose,{schema} from 'mongoose'
const commentSchema= new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    blog:mongoose.Schema.Types.ObjectId,
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    comment:{type:String,required:true}

})
module.exports=mongoose.model('Comments',commentSchema)