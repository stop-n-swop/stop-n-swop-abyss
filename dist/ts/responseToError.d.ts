import { BadRequestError, ConflictError, NotAuthenticatedError, NotAuthorisedError, NotFoundError, UnknownError } from './common';
export declare const responseToError: (response: {
    status: number;
    error: Record<string, any>;
}) => UnknownError | NotFoundError | NotAuthenticatedError | NotAuthorisedError | ConflictError | BadRequestError;
