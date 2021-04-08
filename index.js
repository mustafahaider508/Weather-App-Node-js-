const http = require("http");
const fs = require("fs");
var requests = require("requests");
const fetch = require("node-fetch");

const homeFile = fs.readFileSync("home.html", "utf-8");


const replaceVal = (tempVal, orgVal) => {
  let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
  temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
  temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
  temperature = temperature.replace("{%location%}", orgVal.name);
  temperature = temperature.replace("{%country%}", orgVal.sys.country);
  temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);

  return temperature;
};

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    requests(
      "api.openweathermap.org/data/2.5/weather?q=Peshawar&appid=dccc147924a249b664ad69142ad0396b"
    )

    fetch('https://api.openweathermap.org/data/2.5/weather?q=Peshawar&appid=dccc147924a249b664ad69142ad0396b')
    .then(res => res.json())
    .then(json => {
  
      const  data = [json];
      // console.log(`city name is ${data[0].name}`);  
      // res.send(`city name is ${data[0].name} and the temperature is ${data[0].main.temp}`) ;

      const realTimeData = data
  .map((val) => replaceVal(homeFile, val))
  .join("");
res.write(realTimeData);
res.end()

  }) 
  
      
  } else {
    res.end("File not found");
  }
});

server.listen(8000, "127.0.0.1");