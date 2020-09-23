// login form validation


let  sendmessage= (name,email,msg)=>{
	let timeStamp=Date.now();
	db.collection('queries').add({name:name,email:email,message:msg,time:timeStamp}).then(resp=>{
	 document.forms['cform']['name'].value="";
	 document.forms['cform']['email'].value="";
	 document.forms['cform']['msg'].value="";
 		}).catch(err=>{
 			return  err;
 		});
 return false;

}

let validatecontactform =()=>{
	// 
	let name=document.forms['cform']['name'].value;
	let email=document.forms['cform']['email'].value.replace(/\s/g,"");
	let msg=document.forms['cform']['msg'].value.replace(/\s/g,"");
	let emailRegex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	// 
	let name_error=document.querySelector("#name_error");
	let email_error=document.querySelector("#email_error");
	let msg_error=document.querySelector("#msg_error");
	if(email.match(emailRegex) && name.length>=4 && msg.length>=4){
		return sendmessage(name,email,msg);

		
	}else{
		// 
		if (name.length<=4){
			document.forms['cform']['name'].style['border']='1px solid #ff8080'
			name_error.innerHTML="Invalid Name"

		}else{
			document.forms['cform']['name'].style['border']='1px solid #9B51E0'
			name_error.innerHTML=""
		}
		// 

		 if (msg.length<=4){
			document.forms['cform']['msg'].style['border']='1px solid #ff8080'
			msg_error.innerHTML="Too short"

		}else{
			document.forms['cform']['msg'].style['border']='1px solid #9B51E0'
			msg_error.innerHTML=""
		}

		// 

		if(email.match(emailRegex)){
			document.forms['cform']['email'].style['border']='1px solid #9B51E0'
			email_error.innerHTML=""
		}else{
			document.forms['cform']['email'].style['border']='1px solid #ff8080'
			email_error.innerHTML="Invalid Email Address"
		}

		
		return false;
	}
	return false;
}



