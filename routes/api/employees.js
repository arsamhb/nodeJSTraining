const express = require("express");
const router = express.Router();
const employeeController = require("../../controllers/employeeController");
const verifyJWT = require("./../../middleware/verifyJWT");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  // you can add the verifyJWT middleware to any
  // of these route you want to protect
  // but if you want to do this for all
  // you can add it to server file
  // under routes we dont want to protect
  // and above the routes we want to protect
  //.get(verifyJWT, employeeController.getAllEmployee)
  .get(employeeController.getAllEmployee)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeeController.postEmployee
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeeController.updateEmployee
  )
  .delete(verifyRoles(ROLES_LIST.Admin), employeeController.deleteEmployee);

router.route("/:id").get(employeeController.getEmployee);

module.exports = router;
