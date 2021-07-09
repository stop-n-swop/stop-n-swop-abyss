import { BadRequestError, UnknownError } from "./common";

export enum PaymentErrorCode {
  MISSING_REGISTER_FIELDS = "MISSING_REGISTER_FIELDS",
  FAILED_TO_REGISTER = "FAILED_TO_REGISTER",
}

export class MissingRegisterFieldsError extends BadRequestError {
  code = PaymentErrorCode.MISSING_REGISTER_FIELDS;

  toString() {
    return 'You are missing some required data from your account. Please check the "details" and "address" sections of your account are completed...';
  }
}

export class FailedToRegisterError extends UnknownError {
  code = PaymentErrorCode.FAILED_TO_REGISTER;

  toString() {
    return "Something went wrong trying to register your account as an active buyer/seller";
  }
}
