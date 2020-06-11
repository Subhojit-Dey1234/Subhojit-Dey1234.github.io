var shoppingCart = document.querySelector('.nav-shopping');
var aside = document.querySelector('.shopping');
var close = document.querySelector('.fa-times-circle');
var addCart =document.querySelectorAll('.add-to-cart');
var cartBackground = document.querySelector('.count');
var price = document.querySelectorAll('.total-price a')[1];
var numberItems = document.querySelector('.number-items');
var count = document.querySelector('.cart-background');

shoppingCart.addEventListener('click',function(){
    aside.classList.add('show');
    count.classList.add('show');
})
close.addEventListener('click',function(){
    aside.classList.remove('show');
    count.classList.remove('show');
})



/* creating the element*/
addCart.forEach(function(e){
    e.addEventListener('click', function(){
        let id = e.parentElement.parentElement.className.substr(-1);
        var itemItem = document.getElementsByClassName(`items ${id}`);
        if(itemItem.length === 0)
        {
            /* the count items with id*/
                    var items = document.createElement('div');
                    items.classList.add('items');
                    items.classList.add(id.substr(-1));
                    

                    var image = document.createElement('img');
                    image.src = e.parentElement.querySelector('img').src;
                    items.append(image);
                    var details = document.createElement('div');
                    details.classList.add('details');

                    var itemName = document.createElement('a');
                    itemName.textContent = e.parentElement.parentElement.querySelectorAll('p')[0].textContent;

                    var itemPrice = document.createElement('a');
                    itemPrice.textContent = e.parentElement.parentElement.querySelectorAll('p')[1].textContent;
                    itemPrice.style.fontWeight = "bolder";

                    var remove = document.createElement('a');
                    remove.href = "#"
                    remove.classList.add('remove');
                    remove.textContent = "remove";
                    remove.style.color = "gray";

                    details.append(itemName);
                    details.append(itemPrice);
                    details.append(remove);
                    items.append(details);

                    var arrow = document.createElement('div');
                    arrow.classList.add('arrow');
                    var up = document.createElement('i');
                    up.classList.add('fa');
                    up.classList.add('fa-angle-up');
                    up.style.cursor = "pointer";
                    arrow.append(up);
                    
                    var number = document.createElement('a');
                    number.textContent = 1;
                    arrow.append(number);


                    var down = document.createElement('i');
                    down.classList.add('fa');
                    down.classList.add('fa-angle-down');
                    down.style.cursor = "pointer";
                    arrow.append(down);

                    items.append(arrow);
                    cartBackground.append(items);

        }
        else
        {
                var itemItem = document.getElementsByClassName('items');
                Array.from(itemItem).forEach(function(e){
                var p = e.className.substr(-1);
                if(id == p)
                {
                    var number = e.querySelector('.fa.fa-angle-up').nextElementSibling.textContent;
                    var n = parseInt(number);
                    n = n +1;
                    e.querySelector('.fa.fa-angle-up').nextElementSibling.textContent = n;
                }
            })
        }
        /* Add Cart*/
        var number = parseInt(numberItems.textContent);
        number = number + 1;
        numberItems.textContent = number;

        /*Total Price*/
        var priceFloat = parseFloat(price.textContent.substring(1,));
        var priceItem = parseFloat(this.parentElement.parentElement.querySelectorAll('p')[1].textContent.substring(1,));
        priceFloat = priceFloat + priceItem;
        price.textContent = "$" + priceFloat.toFixed(2);
    })
})



cartBackground.addEventListener('click',function(e){
    var remItem = e.target;
    if(remItem.className == 'remove'){
        /* removing the items count from the Cart*/
        var removeClass = remItem.parentElement.parentElement;
        var value = removeClass.querySelector('.arrow').querySelector('a').textContent;
        var valueInt = parseInt(value);
        console.log(valueInt);
        var l = parseInt(numberItems.textContent);
        console.log(l);
        var v = l - valueInt;
        numberItems.textContent = v;
        removeClass.remove();

        /*Price remove*/
        var pr = parseFloat(price.textContent.substring(1,));
        var itemPr = parseFloat(remItem.parentElement.querySelectorAll('a')[1].textContent.substring(1,));
        console.log(itemPr);
        pr = (pr - (valueInt * itemPr)).toFixed(2);
        price.textContent = '$' + pr;
    }
    if(remItem.className == "fa fa-angle-up")
    {
        var n = remItem.nextElementSibling.textContent;
        var nItem = parseInt(n);
        nItem = nItem + 1;
        remItem.nextElementSibling.textContent = nItem;

        var number = parseInt(numberItems.textContent);
        number = number + 1;
        numberItems.textContent = number;  
        
        

        var priceFloat = parseFloat(price.textContent.substring(1,));
        var priceItem = parseFloat(remItem.parentElement.parentElement.querySelectorAll('.details a')[1].textContent.substring(1,));
        priceFloat = priceFloat + priceItem;
        price.textContent = "$" + priceFloat.toFixed(2);
    }
    if(remItem.className == "fa fa-angle-down")
    {
        var n = remItem.previousElementSibling.textContent;
        var nItem = parseInt(n);
        if(nItem == 1 )
        {
            var priceFloat = parseFloat(price.textContent.substring(1,));
            var priceItem = parseFloat(remItem.parentElement.parentElement.querySelectorAll('.details a')[1].textContent.substring(1,));
            console.log(priceFloat);
            console.log(priceItem);
            priceFloat = priceFloat - priceItem;
            price.textContent = "$" + priceFloat.toFixed(2);


            var removeClass = remItem.parentElement.parentElement;
            removeClass.remove();
            var number = parseInt(numberItems.textContent);
            number = number - 1;
            numberItems.textContent = number;
        }
        else{
        nItem = nItem - 1;
        remItem.previousElementSibling.textContent = nItem;
        var number = parseInt(numberItems.textContent);
        number = number - 1;
        numberItems.textContent = number;

        var priceFloat = parseFloat(price.textContent.substring(1,));
        var priceItem = parseFloat(remItem.parentElement.parentElement.querySelectorAll('.details a')[1].textContent.substring(1,));
        console.log(priceFloat);
        console.log(priceItem);
        priceFloat = priceFloat - priceItem;
        price.textContent = "$" + priceFloat.toFixed(2);
        }
    }
}) 



/* Clear Cart */
var clearCart = document.querySelector('.clear-cart');
clearCart.addEventListener('click',function(){
    var itemIte = document.querySelectorAll('.items');
    itemIte.forEach(e =>{
        e.remove();
    })
    numberItems.textContent = 0;
    price.textContent = "$0";
})