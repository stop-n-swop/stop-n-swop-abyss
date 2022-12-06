import { BadRequestError } from './common';
export declare enum PaymentErrorCode {
    PAY_OUT_NOT_READY = "PAY_OUT_NOT_READY",
    PAY_REQUIRED_PAYMENT_METHOD = "REQUIRED_PAYMENT_METHOD",
    PAY_CANCELLED = "CANCELLED"
}
export declare class PayOutNotReadyError extends BadRequestError {
    code: PaymentErrorCode;
    constructor();
    toString(): string;
}
export declare class PayRequiredPaymentMethodError extends BadRequestError {
    code: PaymentErrorCode;
    toString(): string;
}
export declare class PayCancelledError extends BadRequestError {
    code: PaymentErrorCode;
    toString(): string;
}
