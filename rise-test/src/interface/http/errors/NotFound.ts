import HttpStatus from "http-status-codes";
import BaseError from "./base";

class NotFoundError extends BaseError {
  message!: string;
  status?: number;
  data?: object;
  constructor(
    message = "Resource not found",
    status: number = HttpStatus.NOT_FOUND,
    data?: object
  ) {
    super(message, status, data);
    this.name = "NotFoundError";
  }
}

export default NotFoundError;
