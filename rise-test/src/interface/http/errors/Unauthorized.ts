import HttpStatus from "http-status-codes";
import BaseError from "./base";

class UnauthorizedError extends BaseError {
  message!: string;
  status?: number;
  data?: object;
  constructor(message = "Access Denied!", status: number = HttpStatus.UNAUTHORIZED, data?: object) {
    super(message, status, data);
    this.name = "UnauthorizedError";
  }
}

export default UnauthorizedError;
