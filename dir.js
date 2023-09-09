const { existsSync } = require("fs");
const fsPromises = require("fs/promises");

const makingDirectory = async () => {
  try {
    if (!existsSync("./newFolder")) {
      await fsPromises.mkdir("./newFolder");
      console.log("directory created");
    }
    await fsPromises.rmdir("./newFolder");
    console.log("directory removed");
  } catch (err) {
    console.log(err);
  }
};

makingDirectory();
