import { BadRequestError, NotFoundError } from './common';

export enum ProductErrorCode {
  PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
  INVALID_GAME_PLATFORM = 'INVALID_GAME_PLATFORM',
}

export class ProductNotFoundError extends NotFoundError {
  code = ProductErrorCode.PRODUCT_NOT_FOUND;

  constructor(id: string) {
    super('product', id);
  }

  toString() {
    return `Hmm, we couldn't find a product with the id ${this.entityId}`;
  }
}

export class InvalidGamePlatformError extends BadRequestError {
  code = ProductErrorCode.INVALID_GAME_PLATFORM;

  constructor(public platformId: string, public gameId: string) {
    super(`Invalid platform ${platformId} for game ${gameId}`);
  }

  toString() {
    return `Invalid platform ${this.platformId} for game ${this.gameId}`;
  }

  toHttpResponse() {
    return {
      status: this.status,
      body: {
        id: this.id,
        code: this.code,
        platformId: this.platformId,
        gameId: this.gameId,
      },
    };
  }
}
