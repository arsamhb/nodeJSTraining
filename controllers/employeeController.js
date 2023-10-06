const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};
const getAllEmployee = (req, res) => {
  res.json(data.employees);
  console.log("logloglog");
};
const postEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res
      .status(400)
      .json({ message: "first and last name are both required." });
  }
  data.setEmployees([...data.employees, newEmployee]);
  res.json(data.employees);
};
const updateEmployee = (req, res) => {
  const editingEmployee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!editingEmployee) {
    return res.status(400).json({ message: "coudlnt find your employee" });
  }
  if (req.body.firstname) editingEmployee.firstname = req.body.firstname;
  if (req.body.lastname) editingEmployee.lastname = req.body.lastname;
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  const unsortedArray = [...filteredArray, editingEmployee];
  data.setEmployees(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.json(data.employees);
};
const deleteEmployee = (req, res) => {
  const deletedEmployee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!deletedEmployee) {
    return res
      .status(400)
      .json({ message: `could not find your employee with if ${req.body.id}` });
  }
  const filtredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  data.setEmployees([...filtredArray]);
  res.json(data.employees);
};
const getEmployee = (req, res) => {
  const theEmployee = data.employees.find((emp) => req.body.id === emp.id);
  if (!theEmployee) {
    return res
      .status(400)
      .json({ message: `could not find your employee with if ${req.body.id}` });
  }
  res.json(theEmployee);
};

module.exports = {
  getAllEmployee,
  getEmployee,
  deleteEmployee,
  updateEmployee,
  postEmployee,
};
