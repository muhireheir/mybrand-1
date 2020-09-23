
let articles_container=document.querySelector(".articles");
db.collection('blogs').get().then((snapshot)=>{
	snapshot.docs.forEach(doc=>{
        // console.log(doc.data());
        let article_wrapper=document.createElement('div');
        article_wrapper.classList.add('single-article');
        let link=document.createElement('a');
        let img_wrapper=document.createElement('div');
        img_wrapper.classList.add('article-image');
        let img=document.createElement('img');
        let summary=document.createElement('div');
        summary.classList.add('article-summary');
        let title=document.createElement('h4');
        title.classList.add('blog-title');
        let txt=document.createElement('p');
        txt.classList.add('blog-text');
        let info=document.createElement('div');
        info.classList.add('blog-info');
        articles_container.prepend(article_wrapper);
        article_wrapper.appendChild(link);
        img_wrapper.appendChild(img);
        summary.appendChild(title);
        summary.appendChild(txt);
        //add contents
        img.src=doc.data().b_feature_img;
        title.textContent=doc.data().b_title;
        txt.textContent=doc.data().b_content.substr(0,90)+'...';
        link.appendChild(img_wrapper);
        link.append(summary);
        link.href="singleblog.html#"+doc.id;
        let view=document.createElement('i');
        let comment=document.createElement('i');
        let nbr_comment=document.createElement('span');
        let nbr_view=document.createElement('span');
        nbr_view.classList.add('detail-nbr');
        nbr_comment.classList.add('detail-nbr');
        nbr_view.textContent=doc.data().views;
        nbr_comment.textContent=doc.data().comments;
        view.classList.add('fa');
        view.classList.add('fa-eye');
        view.appendChild(nbr_view);
        comment.classList.add('fa');
        comment.classList.add('fa-comment');
        comment.appendChild(nbr_comment);
        info.appendChild(view);
        info.appendChild(comment);
        txt.appendChild(info);
    })
    let loading=document.querySelector(".loader-overlay");
    loading.style['display']='none';
}).catch(error=>{
    alert(error);
    let loading=document.querySelector(".loader-overlay");
    loading.style['display']='none';
})
