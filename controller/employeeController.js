const firebaseConfig = require("../config/firebase-config");
const Employee = require("../models/employeeModel");
//destructuring properties
const { dbFireStore, Timestamp } = firebaseConfig;

const COLLECTION = "employees";

// create an employee
const createEmployee = async (req, res) => {
  try {
    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      branch: req.body.branch,
      joinDate: req.body.joinDate,
    };
    const response = await dbFireStore.collection(COLLECTION).add(data);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

// get all employees
const getAllEmployees = async (req, res) => {
  try {
    const usersRef = dbFireStore.collection(COLLECTION);
    const response = await usersRef.get();

    if (response.empty) {
      return res.status(404).send("No Employee found");
    }

    const responseArr = [];

    response.forEach((doc) => {
      const employeeData = doc.data();

      if (employeeData) {
        const employee = new Employee(
          doc.id,
          employeeData.firstName,
          employeeData.lastName,
          employeeData.branch,
          employeeData.joinDate
        );

        responseArr.push(employee);
      }
    });

    res.status(200).send(responseArr);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).send({ Error: "Internal Server Error" });
  }
};

// get by id
const getEmployeeById = async (req, res) => {
  try {
    const userRef = dbFireStore.collection(COLLECTION).doc(req.params.id);
    const response = await userRef.get();
    if (!response.empty) res.status(200).send(response.data());
    else res.status(404).send("Employee not found");
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

// update
const updateEmployee = async (req, res) => {
  try {
    const id = req.body.id;
    await dbFireStore.collection(COLLECTION).doc(id).update(req.body);
    res.status(200).send({ message: "updated successfully" });
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

//delete
const deleteEmployee = async (req, res) => {
  try {
    await dbFireStore.collection(COLLECTION).doc(req.params.id).delete();
    res.status(200).send({ message: "Deleted!!" });
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
