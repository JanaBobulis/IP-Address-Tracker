//get request

async function getDomain() {
    let response = await fetch('https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_VMqlSxLK7yy6QSSGbqGSwifDqAada');
    let data = await response.json();
    return data; 
}

getDomain().then(data => console.log(data));


