// This Error class can you use it globly in the validation function
export class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
};