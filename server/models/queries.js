import mongoose,{schema} from 'mongoose'
const queriesSchema =mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    message:{type:String,required:true},
    email:{type:String,required:true},
    name:{type:String,required:true}

})
module.exports=mongoose.model('Queries',queriesSchema)