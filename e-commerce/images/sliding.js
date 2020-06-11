var imga = ['product-1.jpeg','product-2.jpeg'];
var i = document.querySelector('img');
/*function image(){
    if(i.src == 'images/product-1.jpeg')
    {
        i.src = 'images/product-2.jpeg';
        console.log(i);
    }
    else
        i.src = 'images/product-1.jpeg';
}*/
var count = 0
var id = setInterval(function(){
    if(i.src.split("/")[4] == 'product-1.jpeg')
    {
        i.src = "product-2.jpeg";
    }
    else
    {
        i.src = "product-1.jpeg";
    }
},3000)