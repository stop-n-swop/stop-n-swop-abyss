import { BadRequestError, ConflictError, NotFoundError } from './common';
export declare enum UserErrorCode {
    USERNAME_NOT_UNIQUE = "USERNAME_NOT_UNIQUE",
    EMAIL_NOT_UNIQUE = "EMAIL_NOT_UNIQUE",
    USER_NOT_FOUND = "USER_NOT_FOUND",
    MERCHANT_NOT_FOUND = "MERCHANT_NOT_FOUND",
    DELETE_BLOCKED = "DELETE_BLOCKED"
}
export declare class UsernameNotUniqueError extends ConflictError {
    code: UserErrorCode;
    toString(): string;
}
export declare class EmailNotUniqueError extends ConflictError {
    email: string;
    code: UserErrorCode;
    constructor(email: string);
    toString(): string;
    toHttpResponse(): {
        body: {
            email: string;
            code: string;
            id: string;
        };
        status: number;
    };
}
export declare class UserNotFoundError extends NotFoundError {
    code: UserErrorCode;
    constructor(id: string);
}
export declare class MerchantNotFoundError extends NotFoundError {
    code: UserErrorCode;
    constructor(id: string);
}
export declare class DeleteBlockedError extends BadRequestError {
    reason: 'orders' | 'listings' | 'balance' | 'withdrawals';
    code: UserErrorCode;
    constructor(reason: 'orders' | 'listings' | 'balance' | 'withdrawals');
    toHttpResponse(): {
        body: {
            reason: "orders" | "listings" | "balance" | "withdrawals";
            code: string;
            id: string;
        };
        status: number;
    };
    toString(): "We cannot close your account as you have outstanding orders" | "We cannot close your account as you have outstanding listings" | "We cannot close your account as you have an unwithdrawn balance" | "You have request a balance withdrawal, we cannot close your account until this has been completed" | "Cannot delete user account";
}
