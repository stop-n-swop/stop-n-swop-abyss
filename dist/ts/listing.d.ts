import { NotAuthorisedError, NotFoundError, UnknownError } from './common';
export declare enum ListingErrorCode {
    CREATE_LISTING = "CREATE_LISTING",
    LISTING_NOT_FOUND = "LISTING_NOT_FOUND",
    UPDATE_FAILED = "UPDATE_FAILED",
    UPDATE_LISTING_PROHIBITED = "UPDATE_LISTING_PROHIBITED"
}
export declare class CreateListingError extends UnknownError {
    code: ListingErrorCode;
    toString(): string;
}
export declare class ListingNotFoundError extends NotFoundError {
    code: ListingErrorCode;
    constructor(id: string);
}
export declare class UpdateListingFailedError extends UnknownError {
    code: ListingErrorCode;
    toString(): string;
}
export declare class UpdateListingProhibitedError extends NotAuthorisedError {
    code: ListingErrorCode;
    toString(): string;
}
