import Blog from '../models/blogs'
import mongoose from 'mongoose'
export default class blogController {
    static async getall(req, res) {
        try {
            const docs = await Blog.find().select('blogId blogTitle blogContent blogImage views comments').exec()
            res.status(200).json({ msg: docs })
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
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
            return blogController.getall(req,res)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    static async oneBlog(req, res) {
    try {
        const id = res.blog._id
    const views = parseInt(res.blog.views) + 1
    await Blog.updateOne({ _id: id }, { $set: { views: views } })
    res.status(200).json({blog:res.blog})
    } catch (error) {
        res.status(500).json({error:error.message})
    }


}




}
