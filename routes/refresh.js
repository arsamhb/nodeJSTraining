const express = require("express");
const router = express.Router();
const refreshTokenController = require("../controllers/refreshTokenController");

// it is a get request because it gets the token
router.get("/", refreshTokenController.handleRefreshToken);

module.exports = router;
