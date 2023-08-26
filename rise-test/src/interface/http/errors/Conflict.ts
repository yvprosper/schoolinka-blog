import HttpStatus from "http-status-codes";
import BaseError from "./base";

class ConflictError extends BaseError {
  message!: string;
  status?: number;
  data?: object;
  constructor(
    message = "Resource already exists",
    status: number = HttpStatus.CONFLICT,
    data?: object
  ) {
    super(message, status, data);
    this.name = "ConflictError";
  }
}

export default ConflictError;
