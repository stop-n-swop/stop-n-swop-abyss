import { BadRequestError } from './common';

export enum PaymentErrorCode {
  PAY_OUT_NOT_READY = 'PAY_OUT_NOT_READY',
  PAY_REQUIRED_PAYMENT_METHOD = 'REQUIRED_PAYMENT_METHOD',
  PAY_CANCELLED = 'CANCELLED',
}

export class PayOutNotReadyError extends BadRequestError {
  code = PaymentErrorCode.PAY_OUT_NOT_READY;

  constructor() {
    super('Attempted to pay out but user is not in a ready state');
  }

  toString() {
    return 'You are not set up for pay outs. Please make sure you have set up bank details and verified your identity.';
  }
}

export class PayRequiredPaymentMethodError extends BadRequestError {
  code = PaymentErrorCode.PAY_REQUIRED_PAYMENT_METHOD;

  toString() {
    return 'Payment failed. Please try another payment method';
  }
}

export class PayCancelledError extends BadRequestError {
  code = PaymentErrorCode.PAY_CANCELLED;

  toString() {
    return 'Payment was cancelled';
  }
}
