var keys = document.querySelectorAll('.keys');
var texts = document.querySelector('.use-keyboard-input');
var caps = document.querySelector('.keyboard__key--activatable');
var space = document.querySelector('.keyboard__key--extra-wide');
var cap = document.querySelectorAll('.keyboard__key');
var backspace = document.querySelector('.keyboard__key--wide');
var enter = document.querySelector('.keyboard__key--dark');



caps.addEventListener('click',function()
{
    caps.classList.toggle('keyboard__key--active');
    for(var i=0;i<26;i++)
    {
        keys[i].classList.toggle('change');
            if(caps.className == "keyboard__key keyboard__key--wide keyboard__key--activatable")
            {
                for(var i=0 ;i<26;i++)
                keys[i].innerHTML = keys[i].innerHTML.toLowerCase();
            }
            if(caps.className == "keyboard__key keyboard__key--wide keyboard__key--activatable keyboard__key--active")
            {
                for(var i=0 ;i<26;i++)
                keys[i].innerHTML = keys[i].innerHTML.toUpperCase();
            }
    }
});

keys.forEach(function(e){
    e.addEventListener('click',function(){
        texts.innerHTML += e.innerHTML;
    })
})
space.addEventListener('click',function(){
    texts.innerHTML +=" ";
})

backspace.addEventListener('click',function(){
    var str = texts.textContent;
    str = str.substring(0,str.length-1);
    texts.textContent = str;
})

enter.addEventListener('click',function(){
    texts.innerHTML = "";
})