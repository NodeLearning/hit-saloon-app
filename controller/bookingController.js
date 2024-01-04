const Booking = require("../models/bookingModel");

const firebaseConfig = require("../config/firebase-config");

//destructuring properties
const { dbFireStore, Timestamp } = firebaseConfig;

const COLLECTION = "bookings";

const bookingsRef = dbFireStore.collection(COLLECTION);

const createBooking = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      contactNumber,
      email,
      service,
      subService,
      subServiceType,
      date,
      timeSlot,
    } = req.body;

    const createdAt = Timestamp.now();

    // Validate required fields
    if (!firstName || !lastName || !contactNumber) {
      return res
        .status(400)
        .send("First name, last name, and contact number are required fields.");
    }

    // Create a new booking instance
    const newBooking = new Booking({
      firstName,
      lastName,
      contactNumber,
      email,
      service,
      subService,
      subServiceType,
      date,
      timeSlot,
      createdAt
    });

    // Add the booking to Firestore
    await bookingsRef.add(newBooking);

    // Return the booking ID
    res.status(201).json({ message: "successfully made appointment"});
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
};

module.exports = {
  createBooking,
};