import mongoose, { schema } from 'mongoose'

const blogsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    blogTitle: { type: String, required: true },
    blogContent: { type: String, required: true },
    blogImage: { type: String, required: true },
    views: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
})

module.exports = mongoose.model('Blog', blogsSchema)