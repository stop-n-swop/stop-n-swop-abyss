import { UnknownError, NotFoundError } from './common';
export declare enum ImageErrorCode {
    UPLOAD_FAILED = "UPLOAD_FAILED",
    NOT_FOUND = "NOT_FOUND"
}
export declare class UploadFailedError extends UnknownError {
    code: ImageErrorCode;
    toString(): string;
}
export declare class ImageNotFoundError extends NotFoundError {
    code: ImageErrorCode;
    constructor(id: string);
}
