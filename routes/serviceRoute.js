const express = require("express");

const {
  createService,
  createSubServiceWithDetails,
  getAllServicesNames,
  getAllSubServicesWithDetails,
  getAllSubServicesWithIDs,
  updateSubServiceById,
  updateSubServiceDetailById,
} = require("../controller/serviceController");

const openServiceRouter = express.Router();
const router = express.Router();

// create only a service
router.post("/", createService);
// add a subService for an existing service with details
router.post("/:id", createSubServiceWithDetails);
// get all services names
openServiceRouter.get("/all/", getAllServicesNames);
// get all sub services with details
openServiceRouter.get("/:id", getAllSubServicesWithDetails);
// get all sub services nad their details with IDs
router.get("/admin/:id", getAllSubServicesWithIDs);
// update sub service by ID
router.put("/:serviceId/subservice/:subServiceId", updateSubServiceById);
// update sub service details
router.put(
  "/:serviceId/subservice/:subServiceId/details/:detailId",
  updateSubServiceDetailById
);

module.exports = { router, openServiceRouter };
