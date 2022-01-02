import { ConflictError, NotFoundError } from './common';

export enum UserErrorCode {
  USERNAME_NOT_UNIQUE = 'USERNAME_NOT_UNIQUE',
  EMAIL_NOT_UNIQUE = 'EMAIL_NOT_UNIQUE',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
}

export class UsernameNotUniqueError extends ConflictError {
  code = UserErrorCode.USERNAME_NOT_UNIQUE;

  toString() {
    return 'This username has already been picked by another user';
  }
}

export class EmailNotUniqueError extends ConflictError {
  code = UserErrorCode.EMAIL_NOT_UNIQUE;

  constructor(public email: string) {
    super();
  }

  toString() {
    return `The email associated with this account (${this.email}) has already been registered. Please log in with your original account, you can then add other login methods from the settings page.`;
  }

  toHttpResponse() {
    const response = super.toHttpResponse();

    return {
      ...response,
      body: {
        ...response.body,
        email: this.email,
      },
    };
  }
}

export class UserNotFoundError extends NotFoundError {
  code = UserErrorCode.USER_NOT_FOUND;

  constructor(id: string) {
    super('user', id);
  }
}
