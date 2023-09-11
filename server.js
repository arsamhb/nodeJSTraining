const http = require("http");
const path = require("path");
const EventEmitter = require("events");
const logEvent = require("./logEvent");
const fs = require("fs");
const fsPromises = require("fs/promises");
const { log } = require("console");

class Emitter extends EventEmitter {}
const myEmitter = new Emitter();
myEmitter.on('log', (msg, fileName) => logEvent(msg, fileName))

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
  try {
    const rawData = await fsPromises.readFe(
      filePath,
      // when you set the type on utf8 you'll miss the images.
      !contentType.includes("image") ? "utf8" : ""
    );
    // BE CAREFUL THAT FOR JSON FILES YOU NEED TO
    // DO A PARSE AND STRINGIFY TO TAKE DATA WITHOUT
    // ANY ISSUES AND COMPLETE
    const data =
      contentType === "application/json" ? JSON.parse(rawData) : rawData;
    response.writeHead(
    // we dont want to tak 200 status in any condidtion
      filePath.includes("404.html") ? 404 : 200 , 
      { "Content-Type": contentType }
    );
    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data
    );
  } catch (err) {
    console.log(err);
    myEmitter.emit('log', `${err.name}: ${err.message}`, 'errLog.txt')
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt')
  
  // getting the extension name from
  // the thing that brpwser wants
  const extension = path.extname(req.url);

  let contentType;
  // and based on the extension value
  // and  using switch case statement
  // we define the contentType value
  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  // here we are trying to get the true path
  // based on what the browser is sending to us
  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  // handeling a situation that .html is not at the end of the
  // req.url
  if (!extension && req.url.slice(-1) !== "/") filePath += ".html";

  const fileExist = fs.existsSync(filePath);

  if (fileExist) {
    //serving the file
    serveFile(filePath, contentType, res);
  } else {
    // 301 -> REDIRECT
    switch (path.parse(filePath).base) {
      case "/old-page.html":
        res.writeHead(301, { location: "/new-page.html" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { location: "/" });
        res.end();
        break;
      default:
        // serving 404
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});

server.listen(PORT, () => {
  console.log(`the server is running on port ${PORT}`);
});
