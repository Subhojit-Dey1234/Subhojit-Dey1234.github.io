var datas = null;
var arrDataActive = []
var arrDataDate = []
var arrConfirmed = []
var myLineChart
var myActiveCaseChart = null
let country = null
var cont1 = document.querySelector('.container1 span')
var cont1p = document.querySelector('.container1 p')
var cont2 = document.querySelector('.container2 span')
var cont2p = document.querySelector('.container2 p')
var cont3 = document.querySelector('.container3 span')
var cont3p = document.querySelector('.container3 p')
var ctx = document.getElementById('Total-case')
var atc = document.getElementById('Active-Case')
var dtc = document.getElementById('Death-Case')
const form = document.querySelector('form input')
const button = document.querySelector('.button')
country = 'india'
requestData()
// button.addEventListener('click',(e)=>{
//     e.preventDefault()
//     if (form.value === "") return;
//     country = form.value;
//     country = country.toLowerCase()
//     console.log(country)
//     requestData()
// })
function requestData(){
const xhr = new XMLHttpRequest()
xhr.open('GET',`https://api.covid19api.com/total/country/${country}`)
xhr.responseType = 'json'
xhr.onload = function(){
    datas = xhr.response
    console.log(datas)
    Array.from(datas).map(data=>{
        arrDataActive.push(data.Active)
        arrConfirmed.push(data.Confirmed)
        arrDataDate.push(data.Deaths)
        
    })
    myLineChart = new Chart(ctx,{
        type:'line',
        data:{
            labels: arrDataActive,
            datasets:[{
                label:['Total Number of Cases:'],
                data: arrConfirmed,
                backgroundColor:'rgba(0,0,255,0.5)',
                borderColor:'#999999',
                borderWidth:0.5,
                pointBackgroundColor:'blue',
                responsive:false,
                radius:1,
        }]
    },
    options: {
        title:{
            position:'top',
            display:true,
            text:'Covid 19 Display',
            fontSize:20,
            fontColor:'black'
        },
        animation:{
            duration:1000,
        },
        scales:{
            xAxes:[{
                gridLines:{
                    color: "rgba(0, 0, 0, 0)",
                },
                ticks: {
                    display: false 
                }
            }],
            yAxes:[{
                gridLines:{
                    color: "rgba(0, 0, 0, 0)",
                },
            }]
        }
    }
})
myActiveCaseChart = new Chart(atc,{
    type:'line',
    data:{
        labels: arrDataActive,
        datasets:[{
            label:'number of Active Covid Cases:',
            data: arrDataActive,
            backgroundColor:'rgba(0,255,0,0.5)',
            borderColor:'#999999',
            borderWidth:0.5,
            pointBackgroundColor:'green',
            responsive:false,
            radius:1,
    }]
},
options: {
    title:{
        position:'top',
        display:true,
        text:'Active Covid Cases',
        fontSize:20,
        fontColor:'black'
    },
    animation:{
        duration:1000,
    },
    scales:{
        xAxes:[{
            gridLines:{
                color: "rgba(0, 0, 0, 0)",
            },
            ticks: {
                display: false 
            }
        }],
        yAxes:[{
            gridLines:{
                color: "rgba(0, 0, 0, 0)",
            },
        }]
    }
}
})
myActiveCaseChart = new Chart(dtc,{
    type:'line',
    data:{
        labels: arrDataDate,
        datasets:[{
            label:'number of Death Covid Cases:',
            data: arrDataDate,
            backgroundColor:'rgba(255,0,0,0.5)',
            borderColor:'#999999',
            borderWidth:0.5,
            pointBackgroundColor:'red',
            responsive:false,
            radius:1,
    }]
},
options: {
    title:{
        position:'top',
        display:true,
        text:'Death Covid Cases',
        fontSize:20,
        fontColor:'black'
    },
    animation:{
        duration:1000,
    },
    scales:{
        xAxes:[{
            gridLines:{
                color: "rgba(0, 0, 0, 0)",
            },
            ticks: {
                display: false 
            }
        }],
        yAxes:[{
            gridLines:{
                color: "rgba(0, 0, 0, 0)",
            },
        }]
    }
}
})
cont1.innerHTML = arrConfirmed[parseInt(arrConfirmed.length)-1]
cont2.innerHTML = arrDataActive[parseInt(arrDataActive.length)-1]
cont3.innerHTML = arrDataDate[parseInt(arrDataDate.length)-1]

var date = datas[parseInt(arrConfirmed.length)-1].Date
cont1p.innerHTML = `Date: ${date.split('T')[0]}`
cont2p.innerHTML = `Date: ${date.split('T')[0]}`
cont3p.innerHTML = `Date: ${date.split('T')[0]}`


arrConfirmed = []
arrDataActive = []
arrDataDate = []
}
xhr.send()
}
