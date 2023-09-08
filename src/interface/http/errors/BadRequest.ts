import HttpStatus from "http-status-codes";
import BaseError from "./base";

class BadRequestError extends BaseError {
  message!: string;
  status?: number;
  data?: object;
  constructor(
    message = "The request was not properly formatted",
    status: number = HttpStatus.BAD_REQUEST,
    data?: object
  ) {
    super(message, status, data);
    this.name = "BadRequestError";
  }
}

export default BadRequestError;
