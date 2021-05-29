import { NotFoundError, UnknownError } from "./common";

export enum ListingErrorCode {
  CREATE_LISTING = "CREATE_LISTING",
  LISTING_NOT_FOUND = "LISTING_NOT_FOUND",
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
