var datas = null;
var arrDataActive = []
var arrDataDate = []
var arrConfirmed = []


fetch('https://api.covid19api.com/total/country/india')
.then(res=>res.json())
.then(datas => {
    Array.from(datas).map(data=>{
        arrDataActive.push(data.Active)
        arrConfirmed.push(data.Confirmed)
        arrDataDate.push(data.Deaths)    
    })    
    
    mapboxgl.accessToken = 'pk.eyJ1Ijoic3ViaG9qaXRkZXkwOSIsImEiOiJja281anpuZGUxZDR0MnFseWwwZWpyd3hvIn0.HlpO7w4zk_bRWFyZmsoC4Q';    
    var map = new mapboxgl.Map({
        container: 'map',    
        style: 'mapbox://styles/mapbox/dark-v10',
        zoom: 4,
        center:[75,23]
    });
    // var markers =  new mapboxgl.Marker({
        //     draggable:false    
        // })
        // .setLngLat([78,22])
        // .addTo(map)
        fetch('data.json')
        .then(res=>res.json())
        .then(datas=>{
            Array.from(datas.data).map(d=>{
                console.log(d.latitude,d.longitude)
                new mapboxgl.Marker({
                    draggable:false
                })
                .setLngLat([d.longitude,d.latitude])
                .addTo(map)
            })
        })
        


map.on('load', function () {
    map.addSource('places', {
    'type': 'geojson',    
    'data': {
    'type': 'FeatureCollection',    
    'features': [
    {
    'type': 'Feature',    
    'properties': {
    'description':    
        `<strong style='text-align:center;font-size:20px;'><h3>INDIA</h3></strong><br><strong>Total Number of  Case:</strong>${arrConfirmed[parseInt(arrConfirmed.length)-1]}<br><strong> Total Number of Deaths: </strong>${arrDataDate[parseInt(arrConfirmed.length)-1]}<br><strong> Total Number of Active Case: </strong>${arrDataActive[parseInt(arrConfirmed.length)-1]}<br><strong>Date :${datas[parseInt(arrConfirmed.length)-1].Date.split('T')[0]}</strong>`
    },
    'geometry': {
    'type': 'Point',    
    'coordinates': [75,23]
    }
}]    
    }
})    

map.addLayer({
    'id': 'places',
    'type': 'circle',
    'source': 'places',
    'paint': {
    'circle-color': '#4264fb',    
    'circle-radius': 6,
    'circle-stroke-width': 2,
    'circle-stroke-color': '#ffffff'
    }
    });
    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
        });
         
        map.on('mouseenter', 'places', function (e) {
        // Change the cursor style as a UI indicator.    
        map.getCanvas().style.cursor = 'pointer';
         
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;
         
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;    
        }
         
        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map);
        });
         
        map.on('mouseleave', 'places', function () {
        map.getCanvas().style.cursor = '';    
        popup.remove();
        });
    });

})    
// 8°4'N and 37°6'N    
// 68°7'E and 97°25'E



