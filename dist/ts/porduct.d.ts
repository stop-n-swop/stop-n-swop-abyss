import { BadRequestError, NotFoundError } from './common';
export declare enum ProductErrorCode {
    PRODUCT_NOT_FOUND = "PRODUCT_NOT_FOUND",
    INVALID_GAME_PLATFORM = "INVALID_GAME_PLATFORM"
}
export declare class ProductNotFoundError extends NotFoundError {
    code: ProductErrorCode;
    constructor(id: string);
    toString(): string;
}
export declare class InvalidGamePlatformError extends BadRequestError {
    platformId: string;
    gameId: string;
    code: ProductErrorCode;
    constructor(platformId: string, gameId: string);
    toString(): string;
    toHttpResponse(): {
        status: number;
        body: {
            id: string;
            code: ProductErrorCode;
            platformId: string;
            gameId: string;
        };
    };
}
