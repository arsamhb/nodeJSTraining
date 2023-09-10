const logEvent = require("./logEvent");
const EventEmitter = require('events')

class MyEmitter extends EventEmitter { };

// initializing the object
const myEmitter = new MyEmitter();

// add listener for the log event
myEmitter.on("log", (msg) => logEvent(msg));

/* I should study this .emit */
myEmitter.emit("log", "arsam wrote this emit");
//next test