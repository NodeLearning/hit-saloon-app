const adminCredentials = require("../config/adminCredentials");

const basicAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Unauthorized: Missing Authorization Header");
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "utf-8"
  );
  const [email, password] = credentials.split(":");

  if (
    email === adminCredentials.email &&
    password === adminCredentials.password
  ) {
    // Valid admin credentials
    next();
  } else {
    res.status(401).send("Unauthorized: Invalid Credentials");
  }
};

module.exports = basicAuthMiddleware;
