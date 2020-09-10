
let layer=document.createElement('div');
layer.classList.add('loader-overlay');
layer.innerHTML="<div class='loader'></div>";
let body=document.querySelector('.body');
body.appendChild(layer);
