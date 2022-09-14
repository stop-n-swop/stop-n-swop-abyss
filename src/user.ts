import { BadRequestError, ConflictError, NotFoundError } from './common';

export enum UserErrorCode {
  USERNAME_NOT_UNIQUE = 'USERNAME_NOT_UNIQUE',
  EMAIL_NOT_UNIQUE = 'EMAIL_NOT_UNIQUE',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  MERCHANT_NOT_FOUND = 'MERCHANT_NOT_FOUND',
  DELETE_BLOCKED = 'DELETE_BLOCKED',
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

export class MerchantNotFoundError extends NotFoundError {
  code = UserErrorCode.MERCHANT_NOT_FOUND;

  constructor(id: string) {
    super('merchant', id);
  }
}

export class DeleteBlockedError extends BadRequestError {
  code = UserErrorCode.DELETE_BLOCKED;

  constructor(
    public reason: 'orders' | 'listings' | 'balance' | 'withdrawals',
  ) {
    super();
  }

  toHttpResponse() {
    const response = super.toHttpResponse();

    return {
      ...response,
      body: {
        ...response.body,
        reason: this.reason,
      },
    };
  }

  toString() {
    switch (this.reason) {
      case 'orders':
        return 'We cannot close your account as you have outstanding orders';
      case 'listings':
        return 'We cannot close your account as you have outstanding listings';
      case 'balance':
        return 'We cannot close your account as you have an unwithdrawn balance';
      case 'withdrawals':
        return 'You have request a balance withdrawal, we cannot close your account until this has been completed';
      default:
        return 'Cannot delete user account';
    }
  }
}
