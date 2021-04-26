const logger = require("./logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const requestLogger = (req, res, next) => {
  logger.info("Method: ", req.method);
  logger.info("Path: ", req.path);
  logger.info("Body", req.body);
  logger.info("---");
  next();
};

/* const tokenExtractor = (req, res, next) => {
  const auth = req.get("Authorization");
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    req.token = auth.substring(7);
  }
  next();
}; */

const userExtractor = async (req, res, next) => {
  const auth = req.get("Authorization");
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    const token = auth.substring(7);
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: "token missing or invalid" });
    }
    req.user = await User.findById(decodedToken.id);
    console.log(req.user);
  }
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "invalid token" });
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).json({ error: "token expired" });
  }
  logger.error(error.message);
  next(error);
};

module.exports = {
  userExtractor,
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
