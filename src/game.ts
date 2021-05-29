import { BadRequestError, NotFoundError } from "./common";

export enum GameErrorCode {
  GAME_NOT_FOUND = "GAME_NOT_FOUND",
  INVALID_GAME_PLATFORM = "INVALID_GAME_PLATFORM",
}

export class GameNotFoundError extends NotFoundError {
  code = GameErrorCode.GAME_NOT_FOUND;

  constructor(id: string) {
    super("game", id);
  }

  toString() {
    return `Hmm, we couldn't find a game with the id ${this.id}`;
  }
}

export class InvalidGamePlatformError extends BadRequestError {
  code = GameErrorCode.INVALID_GAME_PLATFORM;

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
        code: this.code,
        platformId: this.platformId,
        gameId: this.gameId,
      },
    };
  }
}
