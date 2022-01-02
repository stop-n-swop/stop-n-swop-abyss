import { ulid } from "ulid";

export enum CommonErrorCode {
  UNKNOWN = "UNKNOWN",
  NOT_FOUND = "NOT_FOUND",
  NOT_AUTHENTICATED = "NOT_AUTHENTICATED",
  NOT_AUTHORISED = "NOT_AUTHORISED",
  CONFLICT = "CONFLICT",
  BAD_REQUEST = "BAD_REQUEST",
  VALIDATION = "VALIDATION",
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
  toString(): string;
}

export abstract class BaseError extends Error implements IError {
  code: string;
  status: number;
  id: string;

  constructor(message?: string) {
    super(message);
    this.code = CommonErrorCode.UNKNOWN;
    this.status = 500;
    this.id = ulid();
  }

  toHttpResponse() {
    return {
      status: this.status,
      body: {
        code: this.code,
        id: this.id,
      },
    };
  }

  toString() {
    return "An unknown error occurred";
  }
}

export class UnknownError extends BaseError {}

export class NotFoundError extends BaseError {
  code: string = CommonErrorCode.NOT_FOUND;
  status = 404;

  constructor(public entity: string, public entityId: string) {
    super(`Could not find requested ${entity} ${entityId}`);
  }

  toString() {
    if (this.entity && this.entityId) {
      return `Hmm, we couldn't find a ${this.entity} for ${this.entityId}`;
    }
    if (this.entity) {
      return `Hmm, we couldn't find a ${this.entity}`;
    }
    return "Requested resource could not be found";
  }

  toHttpResponse() {
    return {
      status: this.status,
      body: {
        id: this.id,
        code: this.code,
        entityId: this.entityId,
        entity: this.entity,
      },
    };
  }
}

export class NotAuthenticatedError extends BaseError {
  code: string = CommonErrorCode.NOT_AUTHENTICATED;
  status = 401;

  toString() {
    return "You are not correctly authenticated";
  }
}

export class NotAuthorisedError extends BaseError {
  code: string = CommonErrorCode.NOT_AUTHORISED;
  status = 403;

  toString() {
    return "You do not have permission for this action";
  }
}

export class ConflictError extends BaseError {
  code: string = CommonErrorCode.CONFLICT;
  status = 409;

  toString() {
    return "There was a conflict. Maybe a record already exists or was updated by someone else?";
  }
}

export class BadRequestError extends BaseError {
  code: string = CommonErrorCode.BAD_REQUEST;
  status = 400;

  toString() {
    return "The data you provided was not valid...";
  }
}

export class ValidationError extends BadRequestError {
  code: string = CommonErrorCode.VALIDATION;

  constructor(public errors: Record<string, string>) {
    super();
  }

  toHttpResponse() {
    return {
      status: this.status,
      body: {
        id: this.id,
        code: this.code,
        errors: this.errors,
      },
    };
  }

  toString() {
    return "Some required fields are missing or incomplete...";
  }
}
