const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");

const logEvent = async (message, fileName) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const item = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs")))
      // DIRECTORIES ARE JUST FOR DIRECTORIES
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", fileName),
      item
    );
  } catch (err) {
    console.log(err);
  }
};

const reqLogger = (req, res, next) => {
  logEvent(`${req.method}\t${req.headers.origin}\t${req.url}\t`, "reqLogs.txt");
  next();
};

const errLogger = (err, req, res, next) => {
  logEvent(`${err.name}\t${err.message}\t`, "errlogs.txt");
  res.status(500).send(err.message);
};

module.exports = { reqLogger, errLogger };
