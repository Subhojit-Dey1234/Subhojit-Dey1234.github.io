//DOM elements
alert('Click on he Name and Focus and then refresh you will see there will be no change...');
const time = document.getElementById('time');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');

//show time

function showTime(){
    let today = new Date();
    let hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

    //Set AM and PM

    const amPm = hour >= 12 ? 'PM' : 'AM';

    //12Hour Formate
    hour = hour % 12 || 12;

    //time display
    time.innerHTML = `${addZero(hour)}<span>:</span> ${addZero(min)}<span>:</span> ${addZero(sec)} ${amPm}`;

    setTimeout(showTime,1000);
}
function addZero(n){
    return (parseInt(n,10) < 10 ? '0' : '') + n;
}

//set the Background and Greeting
function setBgName(){
    let today = new Date();
    let hour = today.getHours();

    if(hour < 12){
        document.body.style.backgroundImage = "url('images/morning.jpg')";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundSize = "cover";
        greeting.innerHTML = "Good Morning";
    }
    else {
        if(hour < 18)
        //noon
        {
            document.body.style.backgroundImage = "url('images/noon.jpg')";
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundSize = "cover";
            greeting.innerHTML = "Good Afternoon";
        }
        else
            {
                //night
                document.body.style.backgroundImage = "url('images/night.jpeg')";
                document.body.style.backgroundPosition = "center";
                document.body.style.backgroundSize = "cover";
                greeting.innerHTML = "Good Evening";
                document.body.style.color = "white";
            }
        }
}
//get Name

function getName(){
    if(localStorage.getItem('name') === null)
    {
        name.textContent = '[Enter the Name]';
    }
    else{
        name.textContent = localStorage.getItem('name');
    }
}
//set name
function setName(e){
    if(e.type === 'keypress')
    {
        //enter is pressed
        if(e.which == 13 || e.keycode == 13)
        {
            localStorage.setItem('name',e.target.innerHTML);
            name.blur();
        }
    }
    else{
        localStorage.setItem('name',e.target.innerHTML);
    }
}
//set focus
function setFocus(e){
    if(e.type === 'keypress')
    {
        //enter is pressed
        if(e.which == 13 || e.keycode == 13)
        {
            localStorage.setItem('focus',e.target.innerHTML);
            focus.blur();
        }
    }
    else{
        localStorage.setItem('focus',e.target.innerHTML);
    }
}

function getFocus(){
    if(localStorage.getItem('focus') === null)
    {
        focus.textContent = '[Enter the work]';
    }
    else{ 
        focus.textContent = localStorage.getItem('focus');
    }
}

name.addEventListener('keypress',setName);
name.addEventListener('blur',setName);

focus.addEventListener('keypress',setFocus);
focus.addEventListener('blur',setFocus);

setBgName();
showTime();
getName();
getFocus();