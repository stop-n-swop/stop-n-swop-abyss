import { AuthErrorCode, InvalidLoginError, OutdatedTokenError } from "./auth";
import {
  BadRequestError,
  CommonErrorCode,
  ConflictError,
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
} from "./listing";
import { PlatformErrorCode, PlatformNotFoundError } from "./platform";
import {
  UserErrorCode,
  UsernameNotUniqueError,
  UserNotFoundError,
} from "./user";

export const responseToError = (response: {
  status: number;
  error: Record<string, any>;
}) => {
  switch (response.error?.code) {
    case CommonErrorCode.UNKNOWN:
      return new UnknownError();
    case CommonErrorCode.NOT_FOUND:
      return new NotFoundError(response.error.entity, response.error.id);
    case CommonErrorCode.NOT_AUTHORIZED:
      return new NotAuthorisedError();
    case CommonErrorCode.CONFLICT:
      return new ConflictError();
    case CommonErrorCode.BAD_REQUEST:
      return new BadRequestError();
    case CommonErrorCode.VALIDATION:
      return new ValidationError(response.error.errors);

    case UserErrorCode.USERNAME_NOT_UNIQUE:
      return new UsernameNotUniqueError();
    case UserErrorCode.USER_NOT_FOUND:
      return new UserNotFoundError(response.error.id);

    case AuthErrorCode.INVALID_LOGIN:
      return new InvalidLoginError();
    case AuthErrorCode.OUTDATED_TOKEN:
      return new OutdatedTokenError();

    case ImageErrorCode.UPLOAD_FAILED:
      return new UploadFailedError();

    case GameErrorCode.GAME_NOT_FOUND:
      return new GameNotFoundError(response.error.id);
    case GameErrorCode.INVALID_GAME_PLATFORM:
      return new InvalidGamePlatformError(
        response.error.platformId,
        response.error.gameId
      );

    case ListingErrorCode.CREATE_LISTING:
      return new CreateListingError();
    case ListingErrorCode.LISTING_NOT_FOUND:
      return new ListingNotFoundError(response.error.id);

    case PlatformErrorCode.PLATFORM_NOT_FOUND:
      return new PlatformNotFoundError(response.error.id);
    default:
      break;
  }

  switch (response.status) {
    case 400:
      return new BadRequestError();
    case 401:
      return new NotAuthorisedError();
    case 404:
      return new NotFoundError("", "");
    case 409:
      return new ConflictError();
    default:
      break;
  }

  return new UnknownError();
};
