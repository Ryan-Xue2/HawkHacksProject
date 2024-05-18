/* MAPBOX API */

mapboxgl.accessToken = 'pk.eyJ1IjoibWF0cm93eSIsImEiOiJjbHdjNm91aHYwdG9uMmpwNTcxeXhqeWNwIn0.TjvcVEr5Zyn7Gu2H3bSnmw';


// Get the user's position
navigator.geolocation.getCurrentPosition(successLoc, errorLoc, {
    enableHighAccuracy: true
}) 
function successLoc(position) {
    console.log(position)
    setupMap([position.coords.longitude, position.coords.latitude])
}
function errorLoc() {
    setupMap([127.510094,40.339851])
    alert("...")}

function setupMap(center){
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: center, // starting position [lng, lat]
        zoom: 14, // starting zoom
    });
    
    map.addControl(
        new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            unit: 'metric',
            profile: 'mapbox/cycling'
            
        }),
        'top-left'

    );



    const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'bottom-right');    
}







/*
    Rest of code
*/






