const ErrorResponse = require("../Utills/ErrorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  if (err.code === 11000) {
    const message = `Duplicate Field value entered`;
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token";
    error = new ErrorResponse(message, 401);
  }

  // Handle expired JWT token error
  if (err.name === "TokenExpiredError") {
    const message = "Token has expired";
    error = new ErrorResponse(message, 401);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
