/* const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf8"
    );
    await fsPromises.unlink(path.join(__dirname, "files", "starter.txt"));
    console.log(data);
    await fsPromises.writeFile(
      path.join(__dirname, "files", "newPromisfile.txt"),
      "\n\nbacktogame"
    );
    await fsPromises.appendFile(
      path.join(__dirname, "files", "newPromisfile.txt"),
      data
    );
    await fsPromises.rename(
      path.join(__dirname, "files", "newPromisfile.txt"),
      path.join(__dirname, "files", "renamed.txt")
    );
  } catch (err) {
    console.log(err);
  }
};

fileOps();

process.on("uncaughtException", (err) => {
  console.log(`there was an error a uncaught ${err}`);
  process.exit(1);
});
 */

const http = require("http");
const path = require("path");
const EventEmitter = require("events");
const logEvent = require("./logEvent");

class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
});

server.listen(PORT, () => {
  console.log(`the server is running on port ${PORT}`);
});
