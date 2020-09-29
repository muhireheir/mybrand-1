import mongoose,{schema} from 'mongoose'

const usersSchema =mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email:{type:String,required:true,unique:true},
    name:{type:String,required:true},
    password:{type:String,required:true},
    adminRole:{type:Boolean,default:false},
    verified:{type:Boolean,default:false}

})
module.exports=mongoose.model('User',usersSchema)