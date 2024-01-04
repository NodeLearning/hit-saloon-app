const express = require("express");

const {
  createService,
  createSubServiceWithDetails,
} = require("../controller/serviceController");

const router = express.Router();

// create only a service
router.post("/", createService);
// add a subService for an existing service with details
router.post("/:id", createSubServiceWithDetails);

module.exports = router;
