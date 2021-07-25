import {
  BadRequestError,
  NotAuthorisedError,
  NotFoundError,
  UnknownError,
} from "./common";

export enum PaymentErrorCode {
  MISSING_REGISTER_FIELDS = "MISSING_REGISTER_FIELDS",
  FAILED_TO_REGISTER = "FAILED_TO_REGISTER",
  BANK_ACCOUNT_FAIL = "BANK_ACCOUNT_FAIL",
  KYC_DOCUMENT_FAILED = "KYC_DOCUMENT_FAILED",
  KYC_PAGE_TOO_SMALL = "KYC_PAGE_TOO_SMALL",
  KYC_PAGE_FAILED = "KYC_PAGE_FAILED",
  KYC_SUBMIT_FAILED = "KYC_SUBMIT_FAILED",
  PAYMENT_FAILED = "PAYMENT_FAILED",
  INVALID_CARD_NUMBER = "M105101", // The card number given doesn’t match the real number of the card
  INVALID_CARD_NAME = "M105102", // The card holder name given doesn’t match the real owner of the card
  DO_NOT_HONOUR = "M101101", // The error "Do not honor" is a message from the bank. You could get it for several raisons: Maximum amount spent per month has been reached on this card // Maximum amount spent on internet per month has been reached on this card // No more funds on bank account
  INACTIVE_CARD = "M101106", // The card is not active accourding to the bank and can therefore not be used
  MAX_CARD_ATTEMPTS = "M101111", // Too much attempts for the same transaction
  TRANSACTION_REFUSED = "M101199", // The transaction has been refused by the bank. Contact your bank in order to have more information about it
  "3DSECURE_SESSION_EXPIRED" = "M101304", // Secure mode: The 3DSecure authentication session has expired
  "3DSECURE_FAILED" = "M101301", // Secure mode: 3DSecure authentication has failed
  CARD_NUMBER_FORMAT = "M105202", // The card number is not a valid format
  PAST_EXPIRY_DATE = "M105203",
  TXN_NOT_FOUND = "TXN_NOT_FOUND",
  PAY_OUT_NOT_READY = "PAY_OUT_NOT_READY",
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

export class PaymentFailedError extends UnknownError {
  code = PaymentErrorCode.PAYMENT_FAILED;

  toString() {
    return "There was an issue trying to process your payment. Please try again";
  }
}

export class InvalidCardNumberError extends BadRequestError {
  code = PaymentErrorCode.INVALID_CARD_NUMBER;

  toString() {
    return "You have entered an invalid card number";
  }
}

export class InvalidCardNameError extends BadRequestError {
  code = PaymentErrorCode.INVALID_CARD_NAME;

  toString() {
    return "The given name doesn't match the card holder's name";
  }
}

export class DoNotHonourError extends BadRequestError {
  code = PaymentErrorCode.DO_NOT_HONOUR;

  toString() {
    return 'The payment has failed with a "Do Not Honour" response';
  }
}

export class InvactiveCardError extends BadRequestError {
  code = PaymentErrorCode.INACTIVE_CARD;

  toString() {
    return "This card has been flagged as being inactive by your bank";
  }
}

export class MaxCardAttemptsError extends BadRequestError {
  code = PaymentErrorCode.MAX_CARD_ATTEMPTS;

  toString() {
    return "You have reached the maximum number of attempts for this card";
  }
}

export class TransactionRefusedError extends BadRequestError {
  code = PaymentErrorCode.TRANSACTION_REFUSED;

  toString() {
    return "The transaction has been refused. Please contact your bank for more information";
  }
}

export class ThreeDSecureSessionExpiredError extends NotAuthorisedError {
  code = PaymentErrorCode["3DSECURE_SESSION_EXPIRED"];

  toString() {
    return "Your 3D Secure session has expired";
  }
}

export class ThreeDSecureFailedError extends UnknownError {
  code = PaymentErrorCode["3DSECURE_FAILED"];

  toString() {
    return "3D Secure authentication has failed";
  }
}

export class CardNumberFormatError extends BadRequestError {
  code = PaymentErrorCode.CARD_NUMBER_FORMAT;

  toString() {
    return "The card number is not valid, please check and try again";
  }
}

export class PastExpryDateError extends BadRequestError {
  code = PaymentErrorCode.PAST_EXPIRY_DATE;

  toString() {
    return "You have entered an expired date";
  }
}

export class TxnNotFoundError extends NotFoundError {
  code = PaymentErrorCode.TXN_NOT_FOUND;

  constructor(id: string) {
    super("txn", id);
  }
}

export class PayOutNotReadyError extends BadRequestError {
  constructor() {
    super("Attempted to pay out but user is not in a ready state");
  }

  toString() {
    return "You are not set up for pay outs. Please make sure you have set up bank details and verified your identity.";
  }
}
