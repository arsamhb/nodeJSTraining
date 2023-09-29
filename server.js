const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const { reqLogger, errLogger } = require("./middleware/loggers");
const rootRouter = require("./routes/root");
const subdirRouter = require("./routes/subdir");
const employeeRouter = require("./routes/api/employees")
const corsOption = require("./config/corsOption")
const registerRouter = require("./routes/register")
const loginRouter = require("./routes/login")

const PORT = process.env.PORT || 3500;

//PAY ATTENTION THIS SET OF AHNDLERS ACT LIKE A WATER FALL
//SO THESE MIDDLEWARES IN HERE WILL APPLY TO ALL THE DATAS
//COMMING TO SERVER
//  here i want to make logger middleware to log every
//  comes to our server and if it be on top then it will
//  log everything
//  this is a custom middleware and we need a next paramter
//  in custom middlewares
app.use(reqLogger);

// actually using this CORS we can specify that
// which url can interact with us
// app.use(cors(corsOption));

// this is a builtin middle ware for express
// that encode data from form
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));
// for serving json
app.use(express.json());
// for serving static files like css images and...
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/subdir", express.static(path.join(__dirname, "public"))); 

// a middleware to handle routing
// handling root directory
app.use("/", rootRouter);
// handling registration
app.use("/register", registerRouter);
// handling login
app.use("/auth", loginRouter);
// handling subdirectory
app.use("/subdir", subdirRouter);
// handling API directory
app.use("/employees", employeeRouter)

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not found" });
  } else {
    res.type("txt").send("404 Not found");
  }
});

// all of these are like a waterfall so we'll put the error
// handler at then end to handle any erro that occured above
app.use(errLogger);

app.listen(PORT, () => console.log(`the server is running on port ${PORT}`));
