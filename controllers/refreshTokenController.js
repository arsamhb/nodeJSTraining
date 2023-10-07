const userDB = {
  users: require("../model/users.json"),
  setUser: function (data) {
    this.users = data;
  },
};
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  // first we check that we have the cookie and it has property of jwt
  const refreshToken = cookies.jwt;

  if (!refreshToken) return res.sendStatus(401);
  console.log(`this is comming from cookie ${refreshToken}`);

  const foundUser = userDB.users.find(
    (user) => user.refreshToken === refreshToken
  );
  if (!foundUser) {
    console.log("nemiad inja");
    return res.sendStatus(403); //forbidden
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.user !== decoded.username) {
      console.log(decoded);
      console.log("inja cgetor");
      return res.sendStatus(403);
    }
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        userInfo: { username: decoded.username, roles: roles },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "300s" }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
