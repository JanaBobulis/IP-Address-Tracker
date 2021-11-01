var mymap = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiamFuYWJvYnVsaXMiLCJhIjoiY2t2aDF6bGEyMjgzOTJwcGd1OHhqdW1zYyJ9.otvWt14x89J84qEYp4l3ug'
}).addTo(mymap);

var marker = L.marker([51.5, -0.09]).addTo(mymap);