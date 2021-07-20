import {
  BadRequestError,
  ConflictError,
  NotAuthenticatedError,
  NotAuthorisedError,
  NotFoundError,
  UnknownError,
} from "./common";
import { hydrate } from "./hydrate";

export const responseToError = (response: {
  status: number;
  error: Record<string, any>;
}) => {
  let err = hydrate(response.error?.code, response.error);

  if (err.constructor === UnknownError) {
    switch (response.status) {
      case 400:
        return new BadRequestError();
      case 401:
        return new NotAuthenticatedError();
      case 403:
        return new NotAuthorisedError();
      case 404:
        return new NotFoundError("", "");
      case 409:
        return new ConflictError();
      default:
        break;
    }
  }

  return err;
};
