import { BadRequestError, UnknownError } from "./common";

export enum PaymentErrorCode {
  MISSING_REGISTER_FIELDS = "MISSING_REGISTER_FIELDS",
  FAILED_TO_REGISTER = "FAILED_TO_REGISTER",
  BANK_ACCOUNT_FAIL = "BANK_ACCOUNT_FAIL",
  KYC_DOCUMENT_FAILED = "KYC_DOCUMENT_FAILED",
  KYC_PAGE_TOO_SMALL = "KYC_PAGE_TOO_SMALL",
  KYC_PAGE_FAILED = "KYC_PAGE_FAILED",
  KYC_SUBMIT_FAILED = "KYC_SUBMIT_FAILED",
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

export class BankAccountFailError extends UnknownError {
  code = PaymentErrorCode.BANK_ACCOUNT_FAIL;
}

export class KycDocumentFailedError extends UnknownError {
  code = PaymentErrorCode.KYC_DOCUMENT_FAILED;
}

export class KycPageTooSmallError extends BadRequestError {
  code = PaymentErrorCode.KYC_PAGE_TOO_SMALL;

  toString() {
    return "The uploaded file is too small";
  }
}

export class KycPageFailedError extends UnknownError {
  code = PaymentErrorCode.KYC_PAGE_FAILED;
}

export class KycSubmitFailedError extends UnknownError {
  code = PaymentErrorCode.KYC_SUBMIT_FAILED;
}
