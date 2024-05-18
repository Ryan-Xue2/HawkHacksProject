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
    
    const directions =  new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/cycling',
        geometries: 'geojson',
    })
    map.addControl(directions, 'top-left');

    // Adds buttons to zoom in and zoom out at the bottom right of the screen
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'bottom-right');    

    // TODO: Gets the map data in GeoJSON format when a route is found
    directions.on('route', (e) => {
        // alert('route found')
        console.log(e)
        console.log(e.route)
        console.log(e.route[0].geometry)  // encoded polyline thingy  // https://developers.google.com/maps/documentation/utilities/polylineutility
        // https://api.mapbox.com/directions/v5/mapbox/cycling/-79.38355%2C43.647938%3B-71.21272%2C46.81289.json?geometries=polyline&steps=true&overview=full&language=en&access_token=pk.eyJ1IjoibWF0cm93eSIsImEiOiJjbHdjNm91aHYwdG9uMmpwNTcxeXhqeWNwIn0.TjvcVEr5Zyn7Gu2
    })


}






/*
    Rest of code
*/


document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    }).then(response => response.text())
      .then(data => alert(data))
      .catch(error => console.error('Error:', error));
});