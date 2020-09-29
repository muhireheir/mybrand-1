import Blog from '../models/blogs'

const oneblog =async(req,res,next)=>{
try{
    const id=req.params.id
    const blog=await Blog.findOne({_id:id})
    if(blog){
        res.blog=blog
        next()
    }else{
        res.status(404).json({message:'No blog found!'})
    }
}catch(error){
    res.status(500).json({error:error.message})
}

}

export default oneblog