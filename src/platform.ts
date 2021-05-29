import { NotFoundError } from "./common";

export enum PlatformErrorCode {
  PLATFORM_NOT_FOUND = "PLATFORM_NOT_FOUND",
}

export class PlatformNotFoundError extends NotFoundError {
  code = PlatformErrorCode.PLATFORM_NOT_FOUND;

  constructor(id: string) {
    super("platform", id);
  }
}
