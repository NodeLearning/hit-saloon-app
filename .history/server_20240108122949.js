const express = require("express");
const cors = require("cors");

// Increase the default max listeners
require("events").EventEmitter.defaultMaxListeners = 15;

const config = require("./config/config");

// import routes
const employeeRoute = require("./routes/employeeRoute");
const { router, openServiceRouter } = require("./routes/serviceRoute");
const {
  openBookingRouter,
  adminBookingRouter,
} = require("./routes/bookingRoute");

// import middlewares
const basicAuthMiddleware = require("./middleware/basicAuthMiddleware");
const fcmBookingMiddleware = require("./middleware/fcmBookingMiddleware");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes customer - open
app.use("/api/booking", openBookingRouter);
app.use("/api/service", openServiceRouter);

// Apply middleware to admin routes
app.use("/admin", basicAuthMiddleware);

//routes admin
app.use("/admin/employee", employeeRoute);
app.use("/admin/service", router);
app.use("/admin/booking", adminBookingRouter);

app.listen(config.port, () => {
  console.log(`Server is running on ${config.port}`);
});
