import { BadRequestError, NotFoundError } from './common';
export declare enum GameErrorCode {
    GAME_NOT_FOUND = "GAME_NOT_FOUND",
    INVALID_GAME_PLATFORM = "INVALID_GAME_PLATFORM"
}
export declare class GameNotFoundError extends NotFoundError {
    code: GameErrorCode;
    constructor(id: string);
    toString(): string;
}
export declare class InvalidGamePlatformError extends BadRequestError {
    platformId: string;
    gameId: string;
    code: GameErrorCode;
    constructor(platformId: string, gameId: string);
    toString(): string;
    toHttpResponse(): {
        status: number;
        body: {
            id: string;
            code: GameErrorCode;
            platformId: string;
            gameId: string;
        };
    };
}
