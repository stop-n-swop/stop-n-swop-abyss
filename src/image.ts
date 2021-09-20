import { NotFoundError } from ".";
import { UnknownError } from "./common";

export enum ImageErrorCode {
  UPLOAD_FAILED = "UPLOAD_FAILED",
  NOT_FOUND = "NOT_FOUND",
}

export class UploadFailedError extends UnknownError {
  code = ImageErrorCode.UPLOAD_FAILED;

  toString() {
    return "Something went wrong uploading your image, please try again";
  }
}

export class ImageNotFoundError extends NotFoundError {
  code = ImageErrorCode.NOT_FOUND;

  constructor(id: string) {
    super("image", id);
  }
}
