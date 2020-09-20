import mongoose, { schema } from 'mongoose'
const profileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true },
    tel: { type: String, required: true },
    home: { type: String, required: true },
    userid: { type: String }
})
module.exports = mongoose.model('Profile', profileSchema)