//LeafletJS map
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

//Ipify API get request

let baseURL = "https://geo.ipify.org/api/v2/";
let apiKey = "at_fYoUZaikBOMViQjLKIjxtaP3y89rJ"

let ipAddress = document.getElementById('ip-address');
let city = document.getElementById('city');
let region = document.getElementById('region');
let postalCode = document.getElementById('postalCode');
let timeZone = document.getElementById('timezone');
let isp = document.getElementById('isp');
let inputField = document.getElementById('ip-search');

const ipValue = (value) => {
    return /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/.test(value);
};

const updateUI = async (ip) => {
    try {
        if (ip !== "" && /^\s+$/.test(ip) === false) {
            let data, type;
            if (ipValue(ip) || ip === "default") {
                type = "ipAddress"
            } else {
                type = "domain"
            }
            if (query === "default") {
                data = await fetch(`${baseURL}country,city,vpn?apiKey=${apiKey}&${type}=`);
            } else {
                data = await fetch(`${baseURL}country,city,vpn?apiKey=${apiKey}&${type}=${ip}`);
            }

            let result = await data.json();
            ip = result.ip;
            if (result.ip === ip) {
                ipAddress.innerHTML = `${result.ip}`;
                city.innerHTML = `${result.location.city}`;
                region.innerHTML = `${result.location.region}`;
                postalCode.innerHTML = `${result.location.postalCode}`;
                timeZone.innerHTML = `${result.location.timezone}`;
                isp.innerHTML = `${result.isp}`;

                let lng = result.location.lng;
                let lat = result.location.lat;

                marker.setLatLng([lat, lng]).update();  // Updates your defined marker position
                mymap.setView([lat, lng]); // Updates map position
            } else {
                alert('unable to get IP and/or domain details')
                console.log(error)
            }
        }
    } catch (error) {
        alert('unable to get IP and/or domain details')
        console.log(error)
    }
}

document.getElementById("submit-btn").addEventListener("click", performAction);

function performAction(e) {
    e.preventDefault();
    if (inputField.value != '' && inputField.value != null) {
        updateUI(inputField.value);
        return;
    } else {
        alert("Please enter a valid IP address or domain")
    }
}
