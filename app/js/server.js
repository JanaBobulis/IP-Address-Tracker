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

let baseURL = "https://geo.ipify.org/api/v2/";
let apiKey = "at_fYoUZaikBOMViQjLKIjxtaP3y89rJ"

console.log(apiKey)


let ipAddress = document.getElementById('ip-address');
let city = document.getElementById('city');
let region = document.getElementById('region');
let postalCode = document.getElementById('postalCode');
let timeZone = document.getElementById('timezone');
let isp = document.getElementById('isp');
let enteredIp = document.getElementById('ip-search');

// // API get request
// async function getDomain() {
//     let response = await fetch('https://geo.ipify.org/service/account-balance?apiKey=at_VMqlSxLK7yy6QSSGbqGSwifDqAada');
//     let data = await response.json();
//     return data; 
// }

// getDomain().then(data => console.log(data));

const updateUI = (ip) => {
    console.log(ip)
     fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_fYoUZaikBOMViQjLKIjxtaP3y89rJ&ipAddress=${ip}`)
     
     
    .then (results => results.json())
    .then (data => {
        ipAddress.innerHTML = `${data.ip}`;
        city.innerHTML = `${data.location.city}`;
        region.innerHTML = `${data.location.region}`;
        postalCode.innerHTML = `${data.location.postalCode}`;
        timeZone.innerHTML = `${data.location.timezone}`;
        isp.innerHTML = `${data.isp}`;

        let lng = data.location.lng;
        let lat = data.location.lat;

        marker.setLatLng([lat, lng]).update();  // Updates your defined marker position
        mymap.setView([lat, lng]); // Updates map position
    })
    .catch(error => {
        alert('unable to get IP details')
        console.log(error)
    })
}

document.getElementById("submit-btn").addEventListener("click", performAction);

function performAction(e) {
    e.preventDefault();
    if (enteredIp.value != '' && enteredIp.value != null) {
        updateUI(enteredIp.value);
        return;
    } else {
        alert("Please enter a valid IP address")
    }
}




//81.109.105.122