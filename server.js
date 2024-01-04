const express = require("express");
const cors = require('cors');

const config = require('./config/config');

// import routes
const employeeRoute = require('./routes/employeeRoute');
const serviceRoute = require('./routes/serviceRoute');
const bookingRoute = require('./routes/bookingRoute');


const app = express();

// test

//

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//test

//

// routes customer
app.use("/api/booking", bookingRoute);

//routes admin
app.use("/api/employee", employeeRoute);
app.use("/api/service", serviceRoute);


app.listen(config.port, () => {
  console.log(`Server is running on ${config.port}`);
});

//https://firebase.google.com/docs/firestore/data-model
//https://firebase.google.com/docs/firestore/solutions/aggregation