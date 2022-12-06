import { NotFoundError } from './common';
export declare enum PlatformErrorCode {
    PLATFORM_NOT_FOUND = "PLATFORM_NOT_FOUND"
}
export declare class PlatformNotFoundError extends NotFoundError {
    code: PlatformErrorCode;
    constructor(id: string);
}
