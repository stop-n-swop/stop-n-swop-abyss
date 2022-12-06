export declare enum CommonErrorCode {
    UNKNOWN = "UNKNOWN",
    NOT_FOUND = "NOT_FOUND",
    NOT_AUTHENTICATED = "NOT_AUTHENTICATED",
    NOT_AUTHORISED = "NOT_AUTHORISED",
    CONFLICT = "CONFLICT",
    BAD_REQUEST = "BAD_REQUEST",
    VALIDATION = "VALIDATION"
}
export interface IError {
    code: string;
    status: number;
    id: string;
    toHttpResponse(): {
        status: number;
        body: {
            id: string;
            code: string;
        };
    };
    toRpcResponse(): {
        code: number;
        message: string;
        data: {
            id: string;
            code: string;
            [key: string]: any;
        };
    };
    toString(): string;
}
export declare abstract class BaseError extends Error implements IError {
    code: string;
    status: number;
    id: string;
    constructor(message?: string);
    toHttpResponse(): {
        status: number;
        body: {
            code: string;
            id: string;
        };
    };
    toRpcResponse(): {
        code: number;
        message: string;
        data: {
            code: string;
            id: string;
        };
    };
    toString(): string;
}
export declare class UnknownError extends BaseError {
}
export declare class NotFoundError extends BaseError {
    entity: string;
    entityId: string;
    code: string;
    status: number;
    constructor(entity: string, entityId: string);
    toString(): string;
    toHttpResponse(): {
        status: number;
        body: {
            id: string;
            code: string;
            entityId: string;
            entity: string;
        };
    };
}
export declare class NotAuthenticatedError extends BaseError {
    code: string;
    status: number;
    toString(): string;
}
export declare class NotAuthorisedError extends BaseError {
    code: string;
    status: number;
    toString(): string;
}
export declare class ConflictError extends BaseError {
    code: string;
    status: number;
    toString(): string;
}
export declare class BadRequestError extends BaseError {
    code: string;
    status: number;
    toString(): string;
}
export declare class ValidationError extends BadRequestError {
    errors: Record<string, string>;
    code: string;
    constructor(errors: Record<string, string>);
    toHttpResponse(): {
        status: number;
        body: {
            id: string;
            code: string;
            errors: Record<string, string>;
        };
    };
    toString(): string;
}
