import { Injectable } from '@angular/core';
import { GameProfile } from '../model/GameProfile';
import { GameIdsEnum } from '../model/game-ids';

@Injectable({
  providedIn: 'root',
})
export class GameInfoService {
  private games: GameProfile[] = [];

  constructor() {
    const game1 = new GameProfile(
      GameIdsEnum.SortWords.toString(),
      'Sort Words',
      'Player need to sort words',
      'sort-words-game',
      'assets/image/sort-words.jpeg'
    );
    const game2 = new GameProfile(
      GameIdsEnum.MessyGame.toString(),
      'Messy Words',
      'Player need to fix messy words',
      'messy-words-game',
      'assets/image/messy-words.jpeg'
    );
    const game3 = new GameProfile(
      GameIdsEnum.TranslatedWords.toString(),
      'Translate',
      'Player need to translate words',
      'game-translate',
      'assets/image/translate.jpeg'
    );
    const game4 = new GameProfile(
      GameIdsEnum.MemoryGame.toString(),
      'Memory Game',
      'Player need to find match translation',
      'memory-game',
      'assets/image/memory-game.png'
    );

    this.games.push(game1);
    this.games.push(game2);
    this.games.push(game3);
    this.games.push(game4);
  }

  getGames() {
    return this.games;
  }
}
