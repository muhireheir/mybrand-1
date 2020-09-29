const emailchecker = async(req,res,next)=>{
let emailRegex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const email = req.body.email
if(email.match(emailRegex)){
	next()
}else{
	res.status(400).json({error:"Invalid email Adress"})
}



}


export default emailchecker