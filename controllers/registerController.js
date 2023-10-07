const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "username and password are both required" });
  // checking duplicate username
  const duplicate = usersDB.users.find((person) => person.user === user);
  if (duplicate) return res.sendStatus(409);
  try {
    // encrypt password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    // CREATING THE NEWUSER
    const newUser = {
      user: user,
      roles: { User: 7000 },
      pwd: hashedPwd,
    };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    //console.log(usersDB.users);
    res.status(201).json({ message: `user ${newUser.user} created.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };