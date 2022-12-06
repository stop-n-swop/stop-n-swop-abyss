import { BadRequestError, ConflictError, NotAuthenticatedError, NotAuthorisedError, NotFoundError, UnknownError } from './common';
export declare const hydrate: (code: string, error?: Record<string, any>) => UnknownError | NotFoundError | NotAuthenticatedError | NotAuthorisedError | ConflictError | BadRequestError;
