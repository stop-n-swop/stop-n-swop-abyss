import { BadRequestError } from "./common";

export enum PaymentErrorCode {
  PAY_OUT_NOT_READY = "PAY_OUT_NOT_READY",
}

export class PayOutNotReadyError extends BadRequestError {
  constructor() {
    super("Attempted to pay out but user is not in a ready state");
  }

  toString() {
    return "You are not set up for pay outs. Please make sure you have set up bank details and verified your identity.";
  }
}
