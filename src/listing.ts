import { NotAuthorisedError, NotFoundError, UnknownError } from "./common";

export enum ListingErrorCode {
  CREATE_LISTING = "CREATE_LISTING",
  LISTING_NOT_FOUND = "LISTING_NOT_FOUND",
  UPDATE_FAILED = "UPDATE_FAILED",
  UPDATE_LISTING_PROHIBITED = "UPDATE_LISTING_PROHIBITED",
}

export class CreateListingError extends UnknownError {
  code = ListingErrorCode.CREATE_LISTING;

  toString() {
    return "Uhoh looks like we couldn't create this listing. You might want to try again?";
  }
}

export class ListingNotFoundError extends NotFoundError {
  code = ListingErrorCode.LISTING_NOT_FOUND;

  constructor(id: string) {
    super("listing", id);
  }
}

export class UpdateListingFailedError extends UnknownError {
  code = ListingErrorCode.UPDATE_FAILED;

  toString() {
    return "Something went wrong trying to save this listing...";
  }
}

export class UpdateListingProhibitedError extends NotAuthorisedError {
  code = ListingErrorCode.UPDATE_LISTING_PROHIBITED;

  toString() {
    return "You do not have permission to edit this listing";
  }
}
