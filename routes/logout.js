const express = require("express");
const router = express.Router();
const logoutController = require("../controllers/logoutController");

// it is a get request because it gets the token
router.get("/", logoutController.handleLogout);

module.exports = router;
