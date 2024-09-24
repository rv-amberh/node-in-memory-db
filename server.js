const http = require("http");
const port = 4000;
const url = require("url");
const fs = require("fs");

let inMemoryDb = {}; // hold the key value pairs in memory

const server = http.createServer(async (req, res) => {
  //create our server
  console.log(req.url); 

  if (req.url.startsWith("/set") && req.method === "POST") {
    // path for /set with query params and method of POST
    const queryObject = url.parse(req.url, true).query; 
    Object.assign(inMemoryDb, queryObject); 

    console.log(inMemoryDb);
    res.writeHead(201, { "Content-Type": "application/json" }); //send a 200 if successful post
    res.write("Key values are saved"); //message to our client
  }

  if (req.url.startsWith("/get") && req.method === "GET") {
    //path for /set with query params and method of POST
    const queryKey = url.parse(req.url, true).query; 
    const key = Object.values(queryKey).toString(); 
    if (inMemoryDb.hasOwnProperty(key)) {
      //check if our key exists in our memory obj
      console.log(inMemoryDb[key]);
      res.writeHead(200, { "Content-Type": "application/json" }); //send a 200 if successful get
      res.write(${inMemoryDb[key]});
    } else {
      res.writeHead(404, { "Content-Type": "application/json" }); //send a 200 if successful
      res.write("Could not find that value for the key");
    }
  }
  res.end();
});

server.listen(port, () => console.log(Server is running on ${port}));
