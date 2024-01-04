const express = require("express");
const adminBookingRouter = express.Router();
const openBookingRouter = express.Router();

const {
  createBooking,
  getAllBookings,
} = require("../controller/bookingController");

// create booking
openBookingRouter.post("/", createBooking);

// get all bookings
adminBookingRouter.get("/", getAllBookings);

module.exports = { openBookingRouter, adminBookingRouter };
