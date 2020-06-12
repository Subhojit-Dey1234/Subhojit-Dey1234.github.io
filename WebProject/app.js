var con = document.querySelector('.container-4 h3');
var home = document.querySelector('ul li:nth-child(1)');
var section = document.querySelector('.section');

home.addEventListener('click',function(){
    console.log(section.getBoundingClientRect().top);
    section.scrollIntoView(false);
})