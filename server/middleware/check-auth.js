import  jwt, { decode } from 'jsonwebtoken'

module.exports=(req,res,next)=>{
    
    try {
        const  token  = req.headers.authorization
        const decoded = jwt.verify(token,process.env.JWT_KEY)
        res.userInfo = decoded
        next()
        
    } catch (error) {
        res.status(401).json({error:'Auth failed'})

    }
}