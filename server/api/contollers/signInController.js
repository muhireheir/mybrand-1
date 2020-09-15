exports.signIn=(req,res,next)=>{
    const email=(req.body.email)?req.body.email:null
    const password=(req.body.password)?req.body.password:null
    if(email!==null && password!==null){
        const  emailRegex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(email.match(emailRegex) && password.length>=6){
            res.status(200).json({
                message:"welcome "
            })
        }else{
            res.status(400).json({
                error:{message:'Invalid Email or  password'}
            })
        }
        
    }else{
        res.status(400).json({
            error:{message:'Missing Required Params'}
        })
    }
    
}