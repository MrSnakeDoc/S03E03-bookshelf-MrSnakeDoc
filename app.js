const http = require("http");
const fs = require("fs");
const path = require("path");
const port = 5000;
const host = "localhost";
const shelf = require("./src/shelf");
const // Création de notre serveur
  server = http.createServer((req, res) => {
    // On court-circuite l'appel automatique du navigateur au favicon.ico
    if (req.url === "/favicon.ico") {
      res.writeHead(200, { "Content-Type": "image/x-icon" });
      res.end();
      return;
    } else if (req.url === "/styles.css") {
      const cssPath = path.join(__dirname, "src", req.url);
      const cssFile = fs.readFileSync(cssPath, "utf8");
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(cssFile);
      res.end();
    } else if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write(shelf.cssization("dddd, MMMM Do YYYY", "en"));
      res.end();
    } else if (req.url === "/fr") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write(shelf.cssization("dddd DD MMMM YYYY", "fr"));
      res.end();
    } else if (req.url === "/de") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write(shelf.cssization("dddd DD MMMM YYYY", "de"));
      res.end();
    }
  });

// Notre serveur sera sur le port 5000

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
