import { BadRequestError, NotAuthenticatedError } from './common';
export declare enum AuthErrorCode {
    INVALID_LOGIN = "INVALID_LOGIN",
    INVALID_TOKEN = "INVALID_TOKEN",
    OUTDATED_TOKEN = "OUTDATED_TOKEN"
}
export declare class InvalidLoginError extends BadRequestError {
    code: AuthErrorCode;
    toString(): string;
}
export declare class InvalidTokenError extends NotAuthenticatedError {
    code: AuthErrorCode;
}
export declare class OutdatedTokenError extends NotAuthenticatedError {
    code: AuthErrorCode;
}
