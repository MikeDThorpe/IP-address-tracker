let baseURI = "https://geo.ipify.org/api/v1?apiKey=at_y0MIivGQhUrSxc6edlCPpNVwH1TB7&ip";
let IPTest = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
let form = document.forms["ip-form"];
let userInput = document.getElementById("ip-input");

let mapIcon = L.icon({
    iconUrl: '../images/icon-location.svg',
}) 

let apiClient = async (ip) => {
    return fetch(`${baseURI}Address=${ip}`).then((response) => {
       return response.json()
    }).then ((data) => {
        console.log(data)
        let {ip, location, isp} = data
        let map = L.map('map').setView([location.lat, location.lng], 13)
        L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=GqK9TrulMPhUkm350Xvw', {
            attribution: `<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>`
        }).addTo(map)
        L.marker([location.lat, location.lng ], {icon: mapIcon}).addTo(map)
        showResults(ip, location, isp)
    })
    .catch(err => {
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
        apiClient(userInput.value)

    } else {
        form.classList.add("error")
    }
})
