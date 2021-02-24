let baseURI = "https://geo.ipify.org/api/v1?apiKey=at_y0MIivGQhUrSxc6edlCPpNVwH1TB7&ip";

let IPTest = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

let form = document.forms["ip-form"];
let userInput = document.getElementById("ip-input");
let loadScreen = document.getElementById("loading-container");

let map = L.map('map').setView([0, 0], 3)
let mapIcon = L.icon({iconUrl: './ip-address-tracker/images/map-marker-alt-solid.svg'})
let marker = L.marker([0, 0], {icon: mapIcon}).addTo(map)

L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=GqK9TrulMPhUkm350Xvw', {
}).addTo(map)


let getUserIp = async () => {
    let response = await fetch("https://api.ipify.org?format=json")
    response.json().then((data) => {
        apiClient(data.ip)
    })
}



let apiClient = async (ip) => {
    return fetch(`${baseURI}Address=${ip}`).then((response) => {
       return response.json()
    }).then ((data) => {
        loadScreen.style.display = "none"
        let {ip, location, isp} = data
        marker.setLatLng([location.lat, location.lng])
        map.setView([location.lat, location.lng], 13)
        showResults(ip, location, isp)
    })
    .catch(err => {
        loadScreen.style.display = "none"
        alert("An error occured")
        console.log(err)
    })
}

let showResults = (ip, location, isp) => {
    let {country, region, city} = location
    document.getElementById("ip-address").textContent = ip
    document.getElementById("ip-location").textContent = `${city}, ${region} ${country} `
    document.getElementById("ip-timezone").textContent = location.timezone
    document.getElementById("ip-isp").textContent = isp
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(IPTest.test(userInput.value)) {
        form.classList.remove("error")
        loadScreen.style.display = "block"
        apiClient(userInput.value)

    } else {
        form.classList.add("error")
    }
})
