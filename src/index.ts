export interface IError {
  code: string;
  status: number;

  toHttpResponse(): {
    status: number;
    body: {
      code: string;
    };
  };
  toString(): string;
}

export abstract class BaseError extends Error implements IError {
  code = "UNKNOWN";
  status = 500;

  toHttpResponse() {
    return {
      status: this.status,
      body: {
        code: this.code,
      },
    };
  }

  toString() {
    return "An unknown error occurred";
  }
}

export class UnknownError extends BaseError {}

export class NotFoundError extends BaseError {
  code = "NOT_FOUND";
  status = 404;

  toString() {
    return "The requested resource was not found";
  }
}

export class NotAuthorisedError extends BaseError {
  code = "NOT_AUTHORIZED";
  status = 401;

  toString() {
    return "You are not correctly authenticated";
  }
}

export class ConflictError extends BaseError {
  code = "CONFLICT";
  status = 409;

  toString() {
    return "There was a conflict. Maybe a record already exists or was updated by someone else?";
  }
}

export class BadRequestError extends BaseError {
  code = "BAD_REQUEST";
  status = 400;

  toString() {
    return "The data you provided was not valid...";
  }
}

export class UsernameNotUniqueError extends ConflictError {
  code = "USERNAME_NOT_UNIQUE";

  toString() {
    return "This username has already been picked by another user";
  }
}

export class InvalidLoginError extends BadRequestError {
  code = "INVALID_LOGIN";

  toString() {
    return "Unable to log in with these credentials...";
  }
}

export class InvalidTokenError extends NotAuthorisedError {
  code = "INVALID_TOKEN";
}

export class OutdatedTokenError extends NotAuthorisedError {
  code = "OUTDATED_TOKEN";
}

export class UserNotFoundError extends NotFoundError {
  code = "USER_NOT_FOUND";

  toString() {
    return "The user could not be found..";
  }
}

export class ValidationError extends BadRequestError {
  code = "VALIDATION";

  constructor(public errors: Record<string, string>) {
    super();
  }

  toHttpResponse() {
    return {
      status: this.status,
      body: {
        code: this.code,
        errors: this.errors,
      },
    };
  }

  toString() {
    return "";
  }
}

export class UploadFailedError extends UnknownError {
  code = "UPLOAD_FAILED";

  toString() {
    return "Something went wrong uploading your image, please try again";
  }
}

export const responseToError = (response: {
  status: number;
  error: Record<string, any>;
}) => {
  switch (response.error?.code) {
    case "UNKNOWN":
      return new UnknownError();
    case "NOT_FOUND":
      return new NotFoundError();
    case "NOT_AUTHORIZED":
      return new NotAuthorisedError();
    case "CONFLICT":
      return new ConflictError();
    case "BAD_REQUEST":
      return new BadRequestError();
    case "USERNAME_NOT_UNIQUE":
      return new UsernameNotUniqueError();
    case "INVALID_LOGIN":
      return new InvalidLoginError();
    case "OUTDATED_TOKEN":
      return new OutdatedTokenError();
    case "USER_NOT_FOUND":
      return new UserNotFoundError();
    case "VALIDATION":
      return new ValidationError(response.error.errors);
    case "UPLOAD_FAILED":
      return new UploadFailedError();
    default:
      break;
  }

  switch (response.status) {
    case 400:
      return new BadRequestError();
    case 401:
      return new NotAuthorisedError();
    case 404:
      return new NotFoundError();
    case 409:
      return new ConflictError();
    default:
      break;
  }

  return new UnknownError();
};
