import Blog from '../models/blogs'
import multer from 'multer'
import mongoose from 'mongoose'
export default class blogController {

    static async add(req, res) {
        try {
            const image = req.file.path
            const blog = new Blog({
                _id: new mongoose.Types.ObjectId,
                blogTitle: req.body.title,
                blogContent: req.body.content,
                blogImage: image
            })
            const savedBlog = await blog.save()
            res.json(savedBlog)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }




}