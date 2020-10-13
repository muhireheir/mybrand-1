
auth.onAuthStateChanged(auth=>{
	if(auth!=null || auth!=undefined){
	let role=auth.uid;
	localStorage.setItem('loggeduser',role);
	document.querySelector("#showplofile").style.display='inline-block';
	document.querySelector("#showsignIn").style.display='none';
}else{
	document.querySelector("#showsignIn").style.display='inline-block';
	document.querySelector("#showplofile").style.display='none';
}

})