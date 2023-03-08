class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createError = (msg, statusCode) => {
  return new APIError(msg, statusCode);
};

module.exports = { createError, APIError };
