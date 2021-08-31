import { AuthErrorCode, InvalidLoginError, OutdatedTokenError } from "./auth";
import {
  BadRequestError,
  CommonErrorCode,
  ConflictError,
  NotAuthenticatedError,
  NotAuthorisedError,
  NotFoundError,
  UnknownError,
  ValidationError,
} from "./common";
import {
  GameErrorCode,
  GameNotFoundError,
  InvalidGamePlatformError,
} from "./game";
import { ImageErrorCode, UploadFailedError } from "./image";
import {
  CreateListingError,
  ListingErrorCode,
  ListingNotFoundError,
  UpdateListingFailedError,
  UpdateListingProhibitedError,
} from "./listing";
import { PlatformErrorCode, PlatformNotFoundError } from "./platform";
import {
  UserErrorCode,
  UsernameNotUniqueError,
  UserNotFoundError,
} from "./user";
import {
  InvalidStatusError,
  ListingOwnedByUserError,
  OrderErrorCode,
  OrderNotAvailableError,
  OrderNotFoundError,
  OrderNotOwnedByUserError,
} from "./order";
import { PaymentErrorCode, PayOutNotReadyError } from "./payments";

export const hydrate = (code: string, error: Record<string, any> = {}) => {
  switch (code) {
    case CommonErrorCode.UNKNOWN:
      return new UnknownError();
    case CommonErrorCode.NOT_FOUND:
      return new NotFoundError(error.entity, error.entityId);
    case CommonErrorCode.NOT_AUTHENTICATED:
      return new NotAuthenticatedError();
    case CommonErrorCode.NOT_AUTHORISED:
      return new NotAuthorisedError();
    case CommonErrorCode.CONFLICT:
      return new ConflictError();
    case CommonErrorCode.BAD_REQUEST:
      return new BadRequestError();
    case CommonErrorCode.VALIDATION:
      return new ValidationError(error.errors);

    case UserErrorCode.USERNAME_NOT_UNIQUE:
      return new UsernameNotUniqueError();
    case UserErrorCode.USER_NOT_FOUND:
      return new UserNotFoundError(error.entityId);

    case AuthErrorCode.INVALID_LOGIN:
      return new InvalidLoginError();
    case AuthErrorCode.OUTDATED_TOKEN:
      return new OutdatedTokenError();

    case ImageErrorCode.UPLOAD_FAILED:
      return new UploadFailedError();

    case GameErrorCode.GAME_NOT_FOUND:
      return new GameNotFoundError(error.entityId);
    case GameErrorCode.INVALID_GAME_PLATFORM:
      return new InvalidGamePlatformError(error.platformId, error.gameId);

    case ListingErrorCode.CREATE_LISTING:
      return new CreateListingError();
    case ListingErrorCode.LISTING_NOT_FOUND:
      return new ListingNotFoundError(error.entityId);
    case ListingErrorCode.UPDATE_FAILED:
      return new UpdateListingFailedError();
    case ListingErrorCode.UPDATE_LISTING_PROHIBITED:
      return new UpdateListingProhibitedError();

    case PlatformErrorCode.PLATFORM_NOT_FOUND:
      return new PlatformNotFoundError(error.entityId);

    case OrderErrorCode.INVALID_TRANSITION:
      return new InvalidStatusError();
    case OrderErrorCode.ORDER_NOT_FOUND:
      return new OrderNotFoundError(error.entityId);
    case OrderErrorCode.ORDER_NOT_OWNED_BY_USER:
      return new OrderNotOwnedByUserError("", "");
    case OrderErrorCode.LISTING_OWNED_BY_USER:
      return new ListingOwnedByUserError();
    case OrderErrorCode.ORDER_NOT_AVAILABLE:
      return new OrderNotAvailableError();

    case PaymentErrorCode.PAY_OUT_NOT_READY:
      return new PayOutNotReadyError();
    default:
      break;
  }

  return new UnknownError();
};
