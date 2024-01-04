const express = require('express');
const Employee = require('../models/employeeModel');

const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controller/employeeController");

const router = express.Router();

// create an employee
router.post("/", createEmployee);
// get all
router.get("/all", getAllEmployees);
// get by id
router.get("/:id", getEmployeeById);
// update
router.put("/", updateEmployee);
// delete
router.delete("/:id", deleteEmployee);

module.exports = router;