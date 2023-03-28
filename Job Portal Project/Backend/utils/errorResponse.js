// For ErrorResponse by Aditya Raj Sahoo

class ErrorResponse extends Error {
    constructor(message, codeStatus) {
        super(message);
        this.codeStatus = codeStatus;
    }
}

module.exports = ErrorResponse;