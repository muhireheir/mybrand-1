let blogId=location.hash.replace("#","");
let blogInfo;
db.collection('blogs').doc(blogId).get().then((snapshot)=>{
        blogInfo=snapshot.data();
        document.querySelector("#article-image").src=blogInfo.b_feature_img;
        document.querySelector(".blog-title").textContent=blogInfo.b_title;
        document.querySelector(".blog-text").textContent=blogInfo.b_content;
        let views=parseInt(blogInfo.views)+1;
        db.collection('blogs').doc(blogId).update({views:views});
        let loading=document.querySelector(".loader-overlay");
        loading.style['display']='none';
}).catch(error=>{
        alert(error);
        let loading=document.querySelector(".loader-overlay");
        loading.style['display']='none';
})