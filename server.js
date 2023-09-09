const fsPromises = require("fs").promises;
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
