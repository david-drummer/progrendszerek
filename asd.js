import { MainClass } from './main-class';

let myClasss = new MainClass();

const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Hello from Docker\n");
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});