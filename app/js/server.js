//get request

async function getDomain() {
    let response = await fetch('https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_VMqlSxLK7yy6QSSGbqGSwifDqAada');
    let data = await response.json();
    return data; 
}

getDomain().then(data => console.log(data));



const updateUI = async() => {
    const req = await fetch('https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_VMqlSxLK7yy6QSSGbqGSwifDqAada');
    try{
        const allData = await req.json();
        document.getElementById('ip-address').innerHTML = `${allData.ip}`;
        document.getElementById('city').innerHTML = `${allData.location.city}`;
        document.getElementById('region').innerHTML = `${allData.location.region}`;
        document.getElementById('postalCode').innerHTML = `${allData.location.postalCode}`;
        document.getElementById('timezone').innerHTML = `${allData.location.timezone}`;
        document.getElementById('isp').innerHTML = `${allData.isp}`;
        
    }catch(error){
        console.log("error", error);
    }
}
updateUI();

//81.109.105.122