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
import {
  BankAccountFailError,
  CardNumberFormatError,
  DoNotHonourError,
  FailedToRegisterError,
  InvactiveCardError,
  InvalidCardNameError,
  InvalidCardNumberError,
  KycDocumentFailedError,
  KycPageFailedError,
  KycPageTooSmallError,
  KycSubmitFailedError,
  MaxCardAttemptsError,
  MissingRegisterFieldsError,
  PastExpryDateError,
  PaymentErrorCode,
  PaymentFailedError,
  PayOutNotReadyError,
  ThreeDSecureFailedError,
  ThreeDSecureSessionExpiredError,
  TransactionRefusedError,
  TxnNotFoundError,
} from "./payments";

export const hydrate = (code: string, error: Record<string, any> = {}) => {
  switch (code) {
    case CommonErrorCode.UNKNOWN:
      return new UnknownError();
    case CommonErrorCode.NOT_FOUND:
      return new NotFoundError(error.entity, error.id);
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
      return new UserNotFoundError(error.id);

    case AuthErrorCode.INVALID_LOGIN:
      return new InvalidLoginError();
    case AuthErrorCode.OUTDATED_TOKEN:
      return new OutdatedTokenError();

    case ImageErrorCode.UPLOAD_FAILED:
      return new UploadFailedError();

    case GameErrorCode.GAME_NOT_FOUND:
      return new GameNotFoundError(error.id);
    case GameErrorCode.INVALID_GAME_PLATFORM:
      return new InvalidGamePlatformError(error.platformId, error.gameId);

    case ListingErrorCode.CREATE_LISTING:
      return new CreateListingError();
    case ListingErrorCode.LISTING_NOT_FOUND:
      return new ListingNotFoundError(error.id);
    case ListingErrorCode.UPDATE_FAILED:
      return new UpdateListingFailedError();
    case ListingErrorCode.UPDATE_LISTING_PROHIBITED:
      return new UpdateListingProhibitedError();

    case PlatformErrorCode.PLATFORM_NOT_FOUND:
      return new PlatformNotFoundError(error.id);

    case OrderErrorCode.INVALID_TRANSITION:
      return new InvalidStatusError();
    case OrderErrorCode.ORDER_NOT_FOUND:
      return new OrderNotFoundError(error.id);
    case OrderErrorCode.ORDER_NOT_OWNED_BY_USER:
      return new OrderNotOwnedByUserError("", "");
    case OrderErrorCode.LISTING_OWNED_BY_USER:
      return new ListingOwnedByUserError();
    case OrderErrorCode.ORDER_NOT_AVAILABLE:
      return new OrderNotAvailableError();

    case PaymentErrorCode.MISSING_REGISTER_FIELDS:
      return new MissingRegisterFieldsError();
    case PaymentErrorCode.FAILED_TO_REGISTER:
      return new FailedToRegisterError();
    case PaymentErrorCode.BANK_ACCOUNT_FAIL:
      return new BankAccountFailError();
    case PaymentErrorCode.KYC_DOCUMENT_FAILED:
      return new KycDocumentFailedError();
    case PaymentErrorCode.KYC_PAGE_TOO_SMALL:
      return new KycPageTooSmallError();
    case PaymentErrorCode.KYC_PAGE_FAILED:
      return new KycPageFailedError();
    case PaymentErrorCode.KYC_SUBMIT_FAILED:
      return new KycSubmitFailedError();
    case PaymentErrorCode.PAYMENT_FAILED:
      return new PaymentFailedError();
    case PaymentErrorCode.INVALID_CARD_NUMBER:
      return new InvalidCardNumberError();
    case PaymentErrorCode.INVALID_CARD_NAME:
      return new InvalidCardNameError();
    case PaymentErrorCode.DO_NOT_HONOUR:
      return new DoNotHonourError();
    case PaymentErrorCode.INACTIVE_CARD:
      return new InvactiveCardError();
    case PaymentErrorCode.MAX_CARD_ATTEMPTS:
      return new MaxCardAttemptsError();
    case PaymentErrorCode.TRANSACTION_REFUSED:
      return new TransactionRefusedError();
    case PaymentErrorCode["3DSECURE_SESSION_EXPIRED"]:
      return new ThreeDSecureSessionExpiredError();
    case PaymentErrorCode["3DSECURE_FAILED"]:
      return new ThreeDSecureFailedError();
    case PaymentErrorCode.CARD_NUMBER_FORMAT:
      return new CardNumberFormatError();
    case PaymentErrorCode.PAST_EXPIRY_DATE:
      return new PastExpryDateError();
    case PaymentErrorCode.TXN_NOT_FOUND:
      return new TxnNotFoundError(error.id);
    case PaymentErrorCode.PAY_OUT_NOT_READY:
      return new PayOutNotReadyError();
    default:
      break;
  }

  return new UnknownError();
};
