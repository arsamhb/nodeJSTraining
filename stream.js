const fs = require("fs");
const path = require("path")

const rs = fs.createReadStream(path.join(__dirname, "files", "lorem.txt"));
const ws = fs.createWriteStream(path.join(__dirname, "files", "loremPrime.txt"));

rs.pipe(ws)