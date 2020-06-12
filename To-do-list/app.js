var plus = document.querySelector('.plus');
var container = document.querySelector(".items");
var ulitems = document.querySelector('ul');

plus.addEventListener('click',function(){
    var candidate = document.querySelector(".text");
    var text = document.createElement("div");
    var li = document.createElement("li");
    li.className = "list-items";
    var img = document.createElement("img");
    img.src = "trash-alt-regular.svg";
    var image = document.createElement('img');
    image.src = "foursquare-check-in.svg";
    image.classList.add('tick');
    var ul = document.querySelector('ul');
    img.classList.add("del");
    text.innerHTML = candidate.value;
    text.classList.add('items-elements');
    li.appendChild(text);
    li.appendChild(image);
    li.appendChild(img);
    ul.appendChild(li);
    candidate.value = "";
});



container.addEventListener('click',deleteClass);

function deleteClass(e){
    var items = e.target;
    if(items.classList[0] === "del")
    {
        var todo = items.parentElement;
        todo.classList.add('delete');
        todo.addEventListener('animationend',function(){
            todo.remove();
        })
    }
    if(items.classList[0] === 'tick')
    {
        var text = items.previousElementSibling;
        text.style.textDecoration = "line-through";
    }
}