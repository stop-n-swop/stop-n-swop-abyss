import { UnknownError } from "./common";

export enum ImageErrorCode {
  UPLOAD_FAILED = "UPLOAD_FAILED",
}

export class UploadFailedError extends UnknownError {
  code = ImageErrorCode.UPLOAD_FAILED;

  toString() {
    return "Something went wrong uploading your image, please try again";
  }
}
