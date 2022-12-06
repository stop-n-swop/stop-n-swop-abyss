'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ulid = require('ulid');

exports.CommonErrorCode = void 0;
(function (CommonErrorCode) {
  CommonErrorCode["UNKNOWN"] = "UNKNOWN";
  CommonErrorCode["NOT_FOUND"] = "NOT_FOUND";
  CommonErrorCode["NOT_AUTHENTICATED"] = "NOT_AUTHENTICATED";
  CommonErrorCode["NOT_AUTHORISED"] = "NOT_AUTHORISED";
  CommonErrorCode["CONFLICT"] = "CONFLICT";
  CommonErrorCode["BAD_REQUEST"] = "BAD_REQUEST";
  CommonErrorCode["VALIDATION"] = "VALIDATION";
})(exports.CommonErrorCode || (exports.CommonErrorCode = {}));
class BaseError extends Error {
  constructor(message) {
    super(message);
    this.code = void 0;
    this.status = void 0;
    this.id = void 0;
    this.code = exports.CommonErrorCode.UNKNOWN;
    this.status = 500;
    this.id = ulid.ulid();
  }
  toHttpResponse() {
    return {
      status: this.status,
      body: {
        code: this.code,
        id: this.id
      }
    };
  }
  toRpcResponse() {
    const http = this.toHttpResponse();
    return {
      code: http.status,
      message: this.message,
      data: http.body
    };
  }
  toString() {
    return 'An unknown error occurred';
  }
}
class UnknownError extends BaseError {}
class NotFoundError extends BaseError {
  constructor(entity, entityId) {
    super(`Could not find requested ${entity} ${entityId}`);
    this.entity = entity;
    this.entityId = entityId;
    this.code = exports.CommonErrorCode.NOT_FOUND;
    this.status = 404;
  }
  toString() {
    if (this.entity && this.entityId) {
      return `Hmm, we couldn't find a ${this.entity} for ${this.entityId}`;
    }
    if (this.entity) {
      return `Hmm, we couldn't find a ${this.entity}`;
    }
    return 'Requested resource could not be found';
  }
  toHttpResponse() {
    return {
      status: this.status,
      body: {
        id: this.id,
        code: this.code,
        entityId: this.entityId,
        entity: this.entity
      }
    };
  }
}
class NotAuthenticatedError extends BaseError {
  constructor() {
    super(...arguments);
    this.code = exports.CommonErrorCode.NOT_AUTHENTICATED;
    this.status = 401;
  }
  toString() {
    return 'You are not correctly authenticated';
  }
}
class NotAuthorisedError extends BaseError {
  constructor() {
    super(...arguments);
    this.code = exports.CommonErrorCode.NOT_AUTHORISED;
    this.status = 403;
  }
  toString() {
    return 'You do not have permission for this action';
  }
}
class ConflictError extends BaseError {
  constructor() {
    super(...arguments);
    this.code = exports.CommonErrorCode.CONFLICT;
    this.status = 409;
  }
  toString() {
    return 'There was a conflict. Maybe a record already exists or was updated by someone else?';
  }
}
class BadRequestError extends BaseError {
  constructor() {
    super(...arguments);
    this.code = exports.CommonErrorCode.BAD_REQUEST;
    this.status = 400;
  }
  toString() {
    return 'The data you provided was not valid...';
  }
}
class ValidationError extends BadRequestError {
  constructor(errors) {
    super();
    this.errors = errors;
    this.code = exports.CommonErrorCode.VALIDATION;
  }
  toHttpResponse() {
    return {
      status: this.status,
      body: {
        id: this.id,
        code: this.code,
        errors: this.errors
      }
    };
  }
  toString() {
    return 'Some required fields are missing or incomplete...';
  }
}

exports.AuthErrorCode = void 0;
(function (AuthErrorCode) {
  AuthErrorCode["INVALID_LOGIN"] = "INVALID_LOGIN";
  AuthErrorCode["INVALID_TOKEN"] = "INVALID_TOKEN";
  AuthErrorCode["OUTDATED_TOKEN"] = "OUTDATED_TOKEN";
})(exports.AuthErrorCode || (exports.AuthErrorCode = {}));
class InvalidLoginError extends BadRequestError {
  constructor() {
    super(...arguments);
    this.code = exports.AuthErrorCode.INVALID_LOGIN;
  }
  toString() {
    return 'Unable to log in with these credentials...';
  }
}
class InvalidTokenError extends NotAuthenticatedError {
  constructor() {
    super(...arguments);
    this.code = exports.AuthErrorCode.INVALID_TOKEN;
  }
}
class OutdatedTokenError extends NotAuthenticatedError {
  constructor() {
    super(...arguments);
    this.code = exports.AuthErrorCode.OUTDATED_TOKEN;
  }
}

exports.GameErrorCode = void 0;
(function (GameErrorCode) {
  GameErrorCode["GAME_NOT_FOUND"] = "GAME_NOT_FOUND";
  GameErrorCode["INVALID_GAME_PLATFORM"] = "INVALID_GAME_PLATFORM";
})(exports.GameErrorCode || (exports.GameErrorCode = {}));
class GameNotFoundError extends NotFoundError {
  constructor(id) {
    super('game', id);
    this.code = exports.GameErrorCode.GAME_NOT_FOUND;
  }
  toString() {
    return `Hmm, we couldn't find a game with the id ${this.entityId}`;
  }
}
class InvalidGamePlatformError extends BadRequestError {
  constructor(platformId, gameId) {
    super(`Invalid platform ${platformId} for game ${gameId}`);
    this.platformId = platformId;
    this.gameId = gameId;
    this.code = exports.GameErrorCode.INVALID_GAME_PLATFORM;
  }
  toString() {
    return `Invalid platform ${this.platformId} for game ${this.gameId}`;
  }
  toHttpResponse() {
    return {
      status: this.status,
      body: {
        id: this.id,
        code: this.code,
        platformId: this.platformId,
        gameId: this.gameId
      }
    };
  }
}

exports.ImageErrorCode = void 0;
(function (ImageErrorCode) {
  ImageErrorCode["UPLOAD_FAILED"] = "UPLOAD_FAILED";
  ImageErrorCode["NOT_FOUND"] = "NOT_FOUND";
})(exports.ImageErrorCode || (exports.ImageErrorCode = {}));
class UploadFailedError extends UnknownError {
  constructor() {
    super(...arguments);
    this.code = exports.ImageErrorCode.UPLOAD_FAILED;
  }
  toString() {
    return 'Something went wrong uploading your image, please try again';
  }
}
class ImageNotFoundError extends NotFoundError {
  constructor(id) {
    super('image', id);
    this.code = exports.ImageErrorCode.NOT_FOUND;
  }
}

exports.ListingErrorCode = void 0;
(function (ListingErrorCode) {
  ListingErrorCode["CREATE_LISTING"] = "CREATE_LISTING";
  ListingErrorCode["LISTING_NOT_FOUND"] = "LISTING_NOT_FOUND";
  ListingErrorCode["UPDATE_FAILED"] = "UPDATE_FAILED";
  ListingErrorCode["UPDATE_LISTING_PROHIBITED"] = "UPDATE_LISTING_PROHIBITED";
})(exports.ListingErrorCode || (exports.ListingErrorCode = {}));
class CreateListingError extends UnknownError {
  constructor() {
    super(...arguments);
    this.code = exports.ListingErrorCode.CREATE_LISTING;
  }
  toString() {
    return "Uhoh looks like we couldn't create this listing. You might want to try again?";
  }
}
class ListingNotFoundError extends NotFoundError {
  constructor(id) {
    super('listing', id);
    this.code = exports.ListingErrorCode.LISTING_NOT_FOUND;
  }
}
class UpdateListingFailedError extends UnknownError {
  constructor() {
    super(...arguments);
    this.code = exports.ListingErrorCode.UPDATE_FAILED;
  }
  toString() {
    return 'Something went wrong trying to save this listing...';
  }
}
class UpdateListingProhibitedError extends NotAuthorisedError {
  constructor() {
    super(...arguments);
    this.code = exports.ListingErrorCode.UPDATE_LISTING_PROHIBITED;
  }
  toString() {
    return 'You do not have permission to edit this listing';
  }
}

exports.OrderErrorCode = void 0;
(function (OrderErrorCode) {
  OrderErrorCode["ORDER_NOT_FOUND"] = "ORDER_NOT_FOUND";
  OrderErrorCode["ORDER_NOT_OWNED_BY_USER"] = "ORDER_NOT_OWNED_BY_USER";
  OrderErrorCode["INVALID_TRANSITION"] = "INVALID_TRANSITION";
  OrderErrorCode["LISTING_OWNED_BY_USER"] = "LISTING_OWNED_BY_USER";
  OrderErrorCode["ORDER_NOT_AVAILABLE"] = "ORDER_NOT_AVAILABLE";
})(exports.OrderErrorCode || (exports.OrderErrorCode = {}));
class OrderNotFoundError extends NotFoundError {
  constructor(id) {
    super('order', id);
    this.code = exports.OrderErrorCode.ORDER_NOT_FOUND;
  }
}
class OrderNotOwnedByUserError extends NotAuthorisedError {
  constructor(userId, listingId) {
    super(`User [${userId}] is not the buyer or seller of listing [${listingId}]`);
    this.code = exports.OrderErrorCode.ORDER_NOT_OWNED_BY_USER;
  }
  toString() {
    return 'You are not authorised to access this order';
  }
}
class InvalidStatusError extends BadRequestError {
  constructor() {
    super(...arguments);
    this.code = exports.OrderErrorCode.INVALID_TRANSITION;
  }
  toString() {
    return 'You have attempted to change your order status to an invalid value';
  }
}
class ListingOwnedByUserError extends NotAuthorisedError {
  constructor() {
    super(...arguments);
    this.code = exports.OrderErrorCode.LISTING_OWNED_BY_USER;
  }
  toString() {
    return 'You cannot create an order for a listing you own';
  }
}
class OrderNotAvailableError extends ConflictError {
  constructor() {
    super(...arguments);
    this.code = exports.OrderErrorCode.ORDER_NOT_AVAILABLE;
  }
  toString() {
    return 'This listing is no longer available :(';
  }
}

exports.PaymentErrorCode = void 0;
(function (PaymentErrorCode) {
  PaymentErrorCode["PAY_OUT_NOT_READY"] = "PAY_OUT_NOT_READY";
  PaymentErrorCode["PAY_REQUIRED_PAYMENT_METHOD"] = "REQUIRED_PAYMENT_METHOD";
  PaymentErrorCode["PAY_CANCELLED"] = "CANCELLED";
})(exports.PaymentErrorCode || (exports.PaymentErrorCode = {}));
class PayOutNotReadyError extends BadRequestError {
  constructor() {
    super('Attempted to pay out but user is not in a ready state');
    this.code = exports.PaymentErrorCode.PAY_OUT_NOT_READY;
  }
  toString() {
    return 'You are not set up for pay outs. Please make sure you have set up bank details and verified your identity.';
  }
}
class PayRequiredPaymentMethodError extends BadRequestError {
  constructor() {
    super(...arguments);
    this.code = exports.PaymentErrorCode.PAY_REQUIRED_PAYMENT_METHOD;
  }
  toString() {
    return 'Payment failed. Please try another payment method';
  }
}
class PayCancelledError extends BadRequestError {
  constructor() {
    super(...arguments);
    this.code = exports.PaymentErrorCode.PAY_CANCELLED;
  }
  toString() {
    return 'Payment was cancelled';
  }
}

exports.PlatformErrorCode = void 0;
(function (PlatformErrorCode) {
  PlatformErrorCode["PLATFORM_NOT_FOUND"] = "PLATFORM_NOT_FOUND";
})(exports.PlatformErrorCode || (exports.PlatformErrorCode = {}));
class PlatformNotFoundError extends NotFoundError {
  constructor(id) {
    super('platform', id);
    this.code = exports.PlatformErrorCode.PLATFORM_NOT_FOUND;
  }
}

exports.UserErrorCode = void 0;
(function (UserErrorCode) {
  UserErrorCode["USERNAME_NOT_UNIQUE"] = "USERNAME_NOT_UNIQUE";
  UserErrorCode["EMAIL_NOT_UNIQUE"] = "EMAIL_NOT_UNIQUE";
  UserErrorCode["USER_NOT_FOUND"] = "USER_NOT_FOUND";
  UserErrorCode["MERCHANT_NOT_FOUND"] = "MERCHANT_NOT_FOUND";
  UserErrorCode["DELETE_BLOCKED"] = "DELETE_BLOCKED";
})(exports.UserErrorCode || (exports.UserErrorCode = {}));
class UsernameNotUniqueError extends ConflictError {
  constructor() {
    super(...arguments);
    this.code = exports.UserErrorCode.USERNAME_NOT_UNIQUE;
  }
  toString() {
    return 'This username has already been picked by another user';
  }
}
class EmailNotUniqueError extends ConflictError {
  constructor(email) {
    super();
    this.email = email;
    this.code = exports.UserErrorCode.EMAIL_NOT_UNIQUE;
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
        email: this.email
      }
    };
  }
}
class UserNotFoundError extends NotFoundError {
  constructor(id) {
    super('user', id);
    this.code = exports.UserErrorCode.USER_NOT_FOUND;
  }
}
class MerchantNotFoundError extends NotFoundError {
  constructor(id) {
    super('merchant', id);
    this.code = exports.UserErrorCode.MERCHANT_NOT_FOUND;
  }
}
class DeleteBlockedError extends BadRequestError {
  constructor(reason) {
    super();
    this.reason = reason;
    this.code = exports.UserErrorCode.DELETE_BLOCKED;
  }
  toHttpResponse() {
    const response = super.toHttpResponse();
    return {
      ...response,
      body: {
        ...response.body,
        reason: this.reason
      }
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

const hydrate = function (code, error) {
  if (error === void 0) {
    error = {};
  }
  switch (code) {
    case exports.CommonErrorCode.UNKNOWN:
      return new UnknownError();
    case exports.CommonErrorCode.NOT_FOUND:
      return new NotFoundError(error.entity, error.entityId);
    case exports.CommonErrorCode.NOT_AUTHENTICATED:
      return new NotAuthenticatedError();
    case exports.CommonErrorCode.NOT_AUTHORISED:
      return new NotAuthorisedError();
    case exports.CommonErrorCode.CONFLICT:
      return new ConflictError();
    case exports.CommonErrorCode.BAD_REQUEST:
      return new BadRequestError();
    case exports.CommonErrorCode.VALIDATION:
      return new ValidationError(error.errors);
    case exports.UserErrorCode.USERNAME_NOT_UNIQUE:
      return new UsernameNotUniqueError();
    case exports.UserErrorCode.EMAIL_NOT_UNIQUE:
      return new EmailNotUniqueError(error.email);
    case exports.UserErrorCode.USER_NOT_FOUND:
      return new UserNotFoundError(error.entityId);
    case exports.UserErrorCode.MERCHANT_NOT_FOUND:
      return new MerchantNotFoundError(error.entityId);
    case exports.UserErrorCode.DELETE_BLOCKED:
      return new DeleteBlockedError(error.reason);
    case exports.AuthErrorCode.INVALID_LOGIN:
      return new InvalidLoginError();
    case exports.AuthErrorCode.OUTDATED_TOKEN:
      return new OutdatedTokenError();
    case exports.ImageErrorCode.UPLOAD_FAILED:
      return new UploadFailedError();
    case exports.ImageErrorCode.NOT_FOUND:
      return new ImageNotFoundError(error.entityId);
    case exports.GameErrorCode.GAME_NOT_FOUND:
      return new GameNotFoundError(error.entityId);
    case exports.GameErrorCode.INVALID_GAME_PLATFORM:
      return new InvalidGamePlatformError(error.platformId, error.gameId);
    case exports.ListingErrorCode.CREATE_LISTING:
      return new CreateListingError();
    case exports.ListingErrorCode.LISTING_NOT_FOUND:
      return new ListingNotFoundError(error.entityId);
    case exports.ListingErrorCode.UPDATE_FAILED:
      return new UpdateListingFailedError();
    case exports.ListingErrorCode.UPDATE_LISTING_PROHIBITED:
      return new UpdateListingProhibitedError();
    case exports.PlatformErrorCode.PLATFORM_NOT_FOUND:
      return new PlatformNotFoundError(error.entityId);
    case exports.OrderErrorCode.INVALID_TRANSITION:
      return new InvalidStatusError();
    case exports.OrderErrorCode.ORDER_NOT_FOUND:
      return new OrderNotFoundError(error.entityId);
    case exports.OrderErrorCode.ORDER_NOT_OWNED_BY_USER:
      return new OrderNotOwnedByUserError('', '');
    case exports.OrderErrorCode.LISTING_OWNED_BY_USER:
      return new ListingOwnedByUserError();
    case exports.OrderErrorCode.ORDER_NOT_AVAILABLE:
      return new OrderNotAvailableError();
    case exports.PaymentErrorCode.PAY_OUT_NOT_READY:
      return new PayOutNotReadyError();
    case exports.PaymentErrorCode.PAY_CANCELLED:
      return new PayCancelledError();
    case exports.PaymentErrorCode.PAY_REQUIRED_PAYMENT_METHOD:
      return new PayRequiredPaymentMethodError();
  }
  return new UnknownError();
};

const responseToError = response => {
  var _response$error;
  const err = hydrate((_response$error = response.error) == null ? void 0 : _response$error.code, response.error);
  if (err.constructor === UnknownError) {
    switch (response.status) {
      case 400:
        return new BadRequestError();
      case 401:
        return new NotAuthenticatedError();
      case 403:
        return new NotAuthorisedError();
      case 404:
        return new NotFoundError('', '');
      case 409:
        return new ConflictError();
    }
  }
  return err;
};

exports.BadRequestError = BadRequestError;
exports.BaseError = BaseError;
exports.ConflictError = ConflictError;
exports.CreateListingError = CreateListingError;
exports.DeleteBlockedError = DeleteBlockedError;
exports.EmailNotUniqueError = EmailNotUniqueError;
exports.GameNotFoundError = GameNotFoundError;
exports.ImageNotFoundError = ImageNotFoundError;
exports.InvalidGamePlatformError = InvalidGamePlatformError;
exports.InvalidLoginError = InvalidLoginError;
exports.InvalidStatusError = InvalidStatusError;
exports.InvalidTokenError = InvalidTokenError;
exports.ListingNotFoundError = ListingNotFoundError;
exports.ListingOwnedByUserError = ListingOwnedByUserError;
exports.MerchantNotFoundError = MerchantNotFoundError;
exports.NotAuthenticatedError = NotAuthenticatedError;
exports.NotAuthorisedError = NotAuthorisedError;
exports.NotFoundError = NotFoundError;
exports.OrderNotAvailableError = OrderNotAvailableError;
exports.OrderNotFoundError = OrderNotFoundError;
exports.OrderNotOwnedByUserError = OrderNotOwnedByUserError;
exports.OutdatedTokenError = OutdatedTokenError;
exports.PayCancelledError = PayCancelledError;
exports.PayOutNotReadyError = PayOutNotReadyError;
exports.PayRequiredPaymentMethodError = PayRequiredPaymentMethodError;
exports.PlatformNotFoundError = PlatformNotFoundError;
exports.UnknownError = UnknownError;
exports.UpdateListingFailedError = UpdateListingFailedError;
exports.UpdateListingProhibitedError = UpdateListingProhibitedError;
exports.UploadFailedError = UploadFailedError;
exports.UserNotFoundError = UserNotFoundError;
exports.UsernameNotUniqueError = UsernameNotUniqueError;
exports.ValidationError = ValidationError;
exports.hydrate = hydrate;
exports.responseToError = responseToError;
