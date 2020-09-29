import Blog from '../models/blogs'
import Comments from '../models/comments'
import mongoose from 'mongoose'
export default class blogController {
    static async getall(req, res) {
        try {
            const docs = await Blog.find().select('blogId blogTitle blogContent blogImage views comments').exec()
            res.status(200).json({ msg: docs })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
    static async add(req, res) {
        try {
            const image = req.file.path
            const blog = new Blog({
                _id:new mongoose.Types.ObjectId,
                blogTitle: req.body.title,
                blogContent: req.body.content,
                blogImage: image
            })
            await blog.save()
            await blogController.getall(req, res)
        } catch (error) {
            res.status(500).json({ error: error.message })
            console.log(error.message )
        }
    }
    static async deleteBlog(req, res) {
        try {
            await Blog.remove({ _id: req.params.id })
            await blogController.getall(req, res)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
    static async updateBlog(req, res) {
        try {
            let fields = {};
            let op;
            for (op of Object.entries(req.body)) {
                fields[op[0]] = op[1];
            }
            await Blog.updateOne({ blogId: req.params.id }, { $set: fields });
            return res.status(200).json({ message: 'blog updated' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    static async oneBlog(req, res) {
        try {
            const id = res.blog._id;
        const views = parseInt(res.blog.views) + 1;
        await Blog.updateOne({ _id: id }, { $set: { views: views } });
        const blogComments= await Comments.find({blog:id}).populate('user','name email').exec();
        return res.status(200).json({blog:res.blog,comments:blogComments.map(doc=>{
            return{
                user:doc.user,
                comment:doc.comment
            }
        })});
        } catch (error) {
            return res.status(500).json({error:error.message});
        }


    }
    static async addcomment(req, res) {
        try {
            const blog = res.blog._id;
            const user = res.userInfo._id;
            const comments= parseInt(res.blog.comments)+1;
            const comment = new Comments({
                _id:new mongoose.Types.ObjectId(),
                blog: blog,
                user: user,
                comment: req.body.comment
            });
            await comment.save();
            await Blog.updateOne({blogId:blog},{$set:{comments:comments}});
            return res.status(200).json({message:'comment added!'});
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }

    }

}
