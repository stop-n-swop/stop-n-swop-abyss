import { BadRequestError, NotAuthorisedError, NotFoundError } from "./common";

export enum OrderErrorCode {
  ORDER_NOT_FOUND = "ORDER_NOT_FOUND",
  ORDER_NOT_OWNED_BY_USER = "ORDER_NOT_OWNED_BY_USER",
  INVALID_TRANSITION = "INVALID_TRANSITION",
}

export class OrderNotFoundError extends NotFoundError {
  code = OrderErrorCode.ORDER_NOT_FOUND;

  constructor(id: string) {
    super("order", id);
  }
}

export class OrderNotOwnedByUserError extends NotAuthorisedError {
  code = OrderErrorCode.ORDER_NOT_OWNED_BY_USER;

  constructor(userId: string, listingId: string) {
    super(
      `User [${userId}] is not the buyer or seller of listing [${listingId}]`
    );
  }

  toString() {
    return "You are not authorised to access this order";
  }
}

export class InvalidStatusError extends BadRequestError {
  code = OrderErrorCode.INVALID_TRANSITION;

  toString() {
    return "You have attempted to change your order status to an invalid value";
  }
}
