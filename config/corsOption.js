// CROSS ORIGIN RESOURCE SHARING
// go and study some docs on this
//const allowedOrigins = require('./allowedOrigins');
const allowedOrigins = [];

const corsOption = {
  origin: (origin, callback) => {
    //console.log(origin);
    // !origin should be removed
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("error by CORS"));
    }
  },
  optionSuccessStatus: 200,
  // origin: "*",
};

module.exports = corsOption;
