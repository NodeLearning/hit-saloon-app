const Booking = require("../models/bookingModel");
const { fcm, message } = require("../config/fcm_push_notification");
const firebaseConfig = require("../config/firebase-config");
const 

//destructuring properties
const { dbFireStore, Timestamp } = firebaseConfig;

const COLLECTION = "bookings";

const bookingsRef = dbFireStore.collection(COLLECTION);

// create a booking
const createBooking = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      contactNumber,
      email,
      branch,
      service,
      subService,
      subServiceType,
      date,
      timeSlot,
    } = req.body;

    const createdAt = Timestamp.now();

    // Validate required fields
    if (!firstName || !branch || !contactNumber) {
      return res
        .status(400)
        .send(
          "First name, branch name, and contact number are required fields."
        );
    }

    // Create a new booking instance
    const newBooking = new Booking({
      firstName,
      lastName,
      contactNumber,
      email,
      branch,
      service,
      subService,
      subServiceType,
      date,
      timeSlot,
      createdAt,
    });

    const bookingData = newBooking.toObject();
    // Add the booking to Firestore
    await bookingsRef.add(bookingData);

    // Return the booking ID
    res.status(201).json({ message: "successfully made appointment" });

    //
    // fcm.send(message, (err, response) => {
    //   if (err) {
    //     console.log("Something has gone wrong!");
    //   } else {
    //     console.log("Successfully sent with response: ", response);
    //   }
    // });

    //
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
};

// get all bookings
const getAllBookings = async (req, res) => {
  try {
    const snapshot = await bookingsRef.get();

    if (snapshot.empty) {
      return res.status(404).send("No bookings found");
    }

    const bookings = snapshot.docs.map((doc) => {
      const data = doc.data();

      // Convert createdAt field to a human-readable date format
      const createdAtDate = data.createdAt.toDate();
      // Optionally, you can format the date using a library like `moment.js` or `date-fns`
      // For simplicity, we're using the default `toISOString` method here
      const formattedCreatedAt = createdAtDate.toISOString();
      return {
        id: doc.id,
        ...data,
        createdAt: formattedCreatedAt,
      };
    });

    res.status(200).json(bookings);
  } catch (error) {
    res
      .status(500)
      .send({ Error: "Internal Server Error", details: error.message });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
};
