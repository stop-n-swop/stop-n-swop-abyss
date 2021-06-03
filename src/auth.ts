import { BadRequestError, NotAuthenticatedError } from "./common";

export enum AuthErrorCode {
  INVALID_LOGIN = "INVALID_LOGIN",
  INVALID_TOKEN = "INVALID_TOKEN",
  OUTDATED_TOKEN = "OUTDATED_TOKEN",
}

export class InvalidLoginError extends BadRequestError {
  code = AuthErrorCode.INVALID_LOGIN;

  toString() {
    return "Unable to log in with these credentials...";
  }
}

export class InvalidTokenError extends NotAuthenticatedError {
  code = AuthErrorCode.INVALID_TOKEN;
}

export class OutdatedTokenError extends NotAuthenticatedError {
  code = AuthErrorCode.OUTDATED_TOKEN;
}
