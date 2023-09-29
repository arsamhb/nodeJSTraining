const express = require("express");
const router = express.Router();
const employeeController = require("../../controllers/employeeController");
const verifyJWT = require("../.././middleware/verifyJWT");
router
  .route("/")
  .get(verifyJWT, employeeController.getAllEmployee)
  .post(employeeController.postEmployee)
  .put(employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee);

router.route("/:id").get(employeeController.getEmployee);

module.exports = router;
