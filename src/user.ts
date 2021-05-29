import { ConflictError, NotFoundError } from "./common";

export enum UserErrorCode {
  USERNAME_NOT_UNIQUE = "USERNAME_NOT_UNIQUE",
  USER_NOT_FOUND = "USER_NOT_FOUND",
}

export class UsernameNotUniqueError extends ConflictError {
  code = UserErrorCode.USERNAME_NOT_UNIQUE;

  toString() {
    return "This username has already been picked by another user";
  }
}

export class UserNotFoundError extends NotFoundError {
  code = UserErrorCode.USER_NOT_FOUND;

  constructor(id: string) {
    super("user", id);
  }
}
