class ApiClient {
    
    fecthData = (ip) => {
        return fetch(`https://geo.ipify.org/api/v1?apiKey=at_y0MIivGQhUrSxc6edlCPpNVwH1TB7&ipAddress=${ip}`)
    }

}
