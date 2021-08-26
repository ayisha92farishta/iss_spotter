/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require("request");


const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request("https://geo.ipify.org/api/v1?apiKey=at_eM7MdGpmVulGYrWIzYHXKlMsH2jXB&ipAddress=142.122.102.205", (error,response,body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    let ip = data.ip;
    callback(null, ip);

  }
  );
};

const fetchCoordsByIP = function(ip, callback) {
  request(` https://freegeoip.app/json/${ip}`, (error, response, body) => {
    

    if(error){
      callback(error,null);
      return;
    }
    
    if(response.statusCode !== 200){
      callback(Error(`Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`),null);
      return;
    }
    
    let newData = {};

    const {latitude,longitude} = JSON.parse(body); 
   
    callback(null,{latitude,longitude})
  });
};

const fetchISSFlyOverTimes = function(coords,callback){
  
  `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`
}



module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes
};

