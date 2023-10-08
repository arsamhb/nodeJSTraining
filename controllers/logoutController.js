// const usersDB = {
//   users: require("../model/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };
// const path = require("path");
// const fsPromises = require("fs/promises");
const User = require("../model/User");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  // Is refreshToken in db ?
  // const foundUser = usersDB.users.find(
  //   (person) => person.refreshToken === refreshToken
  // );
  const foundUser = await User.findOne({refreshToken}).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  //const currentUser = { ...foundUser, refreshToken: " " };
  // const otherUsers = usersDB.users.filter(
  //   (person) => person.refreshToken !== foundUser.refreshToken
  // );
  //usersDB.setUsers([...otherUsers, currentUser]);
  // await fsPromises.writeFile(
  //   path.join(__dirname, "..", "model", "users.json"),
  //   JSON.stringify(usersDB.users)
  // );
  foundUser.refreshToken = '';
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // secure: true - only server on https
  res.sendStatus(204); // successful but no content to put in response
};

module.exports = { handleLogout };
