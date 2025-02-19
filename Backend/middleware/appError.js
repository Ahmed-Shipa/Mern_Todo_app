export class AppError extends Error {
  constructor(message, statusCode, location) {
    super(message);
    this.statusCode = statusCode ? statusCode : 500;
    this.location = location ? location : null;
  }
}
