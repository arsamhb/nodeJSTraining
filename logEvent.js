const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fsPromises = require("fs/promises");
const fs = require("fs");
const path = require("path");

const logEvent = async (message) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const item = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(item);
  try {
    await fsPromises.appendFile(
      path.join(__dirname, "logs", "customLogs.txt"),
      item
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = logEvent;
