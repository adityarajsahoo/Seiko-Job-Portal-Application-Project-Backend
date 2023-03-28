// For handling and getting the status of errors
const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {

    let error = { ...err };
    error.message = err.message;

    if (err.name === "CastError") {
        const message = `The Resource is not found ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    //For Mongoose duplicate value
    if (err.code === 11000) {
        const message = "Duplicate field value is entered";
        error = new ErrorResponse(message, 400);
    }

    //For Mongoose validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(val => ' ' + val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.codeStatus || 500).json({
        success: false,
        error: error.message || "server error"
    })

}

module.exports = errorHandler;