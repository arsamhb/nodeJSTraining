const userDB = {
  users: require("../model/users.json"),
  setUser: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const path = require("path");
const fsPromises = require("fs/promises");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  //console.log(user,pwd);
  if (!user || !pwd)
    return res
      .sendStatus(400)
      .json({ message: "user and pwd are both required" });
  const foundUser = userDB.users.find((person) => person.user === user);
  //console.log(`this is the found user:${foundUser.user}`);
  if (!foundUser) return res.sendStatus(409);
  const match = await bcrypt.compare(pwd, foundUser.pwd);
  // create JWT
  if (match) {
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      { userInfo : 
        { 
          username: foundUser.user, 
          roles: roles 
        } 
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "300s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.user },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    //saving refresh token with current user
    const otherUsers = userDB.users.filter(
      (person) => person.user !== foundUser.user
    );
    const currentUser = { ...foundUser, refreshToken };
    userDB.setUser([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );
    res.cookie("jwt", refreshToken, {
      // an httpOnly cookie is not availabe to the js
      // and its the security thing in here
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401); // unauthorized
    //console.log(match);
  }
};

module.exports = { handleLogin };
