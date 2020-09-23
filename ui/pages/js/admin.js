auth.onAuthStateChanged(admin=>{
	if(admin!=null || admin!=undefined){
	let role=admin.uid;
	db.collection('users').doc(role).get().then(userInfo=>{
		let  isAdmin=userInfo.data().admin;
		if(isAdmin==false){
			window.location.href="../login.html";

		}
	});
	localStorage.setItem('loggeduser',role);
}else{
	window.location.href="../login.html";
}

})

let dropdownToggler=document.querySelectorAll(".dropdown-toggler");
dropdownToggler.forEach((i,el)=>{
dropdownToggler[el].addEventListener('click',evt=>{
	evt.preventDefault();
	let target=dropdownToggler[el].getAttribute('data-target');
	let sub=document.querySelector(target);
	sub.style.display=(sub.style.display=='block') ? 'none':'block';
});
})
document.querySelector("#logout").addEventListener('click',signout=>{
	signout.preventDefault();
	auth.signOut().then(()=>{
		window.location.href="../login.html";
	});
	

});
window.addEventListener('scroll',()=>{
	if(window.innerWidth<=800){
	let header=document.querySelector(".sidenav");
	header.style.display='none';
	}
})
window.addEventListener('resize',()=>{
	if(window.innerWidth>=800){
	let header=document.querySelector(".sidenav");
	header.style.display='block';
	}
})
document.querySelector("#adminMenuToggler").addEventListener('click',()=>{
	let header=document.querySelector(".sidenav");
	header.style.display=(header.style.display=='block') ? 'none':'block';
})