import { Injectable } from '@angular/core';
import { GameProfile } from '../model/GameProfile';

@Injectable({
    providedIn: 'root'
})
export class GameInfoService {
    
    private games: GameProfile[] = [];

    constructor() {
        let game1 = new GameProfile('1', 'Sort Words', 'Player need to sort words', 'sort-words-game');
        let game2 = new GameProfile('2', 'Messy Words', 'Player need to fix messy words', 'messy-words-game');
        let game3 = new GameProfile('3', 'Translate', 'Player need to translate words', 'game-translate');

        this.games.push(game1);
        this.games.push(game2);
        this.games.push(game3);
    }

    getGames() {
        return this.games;
    }
}