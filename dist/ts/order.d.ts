import { BadRequestError, ConflictError, NotAuthorisedError, NotFoundError } from './common';
export declare enum OrderErrorCode {
    ORDER_NOT_FOUND = "ORDER_NOT_FOUND",
    ORDER_NOT_OWNED_BY_USER = "ORDER_NOT_OWNED_BY_USER",
    INVALID_TRANSITION = "INVALID_TRANSITION",
    LISTING_OWNED_BY_USER = "LISTING_OWNED_BY_USER",
    ORDER_NOT_AVAILABLE = "ORDER_NOT_AVAILABLE"
}
export declare class OrderNotFoundError extends NotFoundError {
    code: OrderErrorCode;
    constructor(id: string);
}
export declare class OrderNotOwnedByUserError extends NotAuthorisedError {
    code: OrderErrorCode;
    constructor(userId: string, listingId: string);
    toString(): string;
}
export declare class InvalidStatusError extends BadRequestError {
    code: OrderErrorCode;
    toString(): string;
}
export declare class ListingOwnedByUserError extends NotAuthorisedError {
    code: OrderErrorCode;
    toString(): string;
}
export declare class OrderNotAvailableError extends ConflictError {
    code: OrderErrorCode;
    toString(): string;
}
