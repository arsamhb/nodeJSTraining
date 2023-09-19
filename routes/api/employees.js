const express = require("express");
const router = express.Router();
const data = {};
// it is something like connecting DB to code
data.employees = require("../../data/employees.json");

router
  .route("/")
  .get((req, res) => {
    res.json(data.employees);
  })
  .post((req, res) => {
    // here we just handling params not coing an actuall api
    res.json({
      "firstname": req.body.firstname,
      "lastname": req.body.lastname,
    });
  })
  .put((req, res) => {
    // here we just handling params not coing an actuall api
    res.json({
      "firstname": req.body.firstname,
      "lastname": req.body.lastname,
    });
  })
  .delete((req, res) => {
    res.json({ "id": req.body.ip });
  });

router.route("/:id")
  .get((req,res)=>{
    res.json({
        "id": req.params.id
    })
  })
module.exports = router;
