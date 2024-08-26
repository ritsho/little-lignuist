import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { TranslatedWord } from '../shared/model/translated-word';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface GameOverData {
  categoryName: string;
  points: number;
  correctGuesses: number;
  words: TranslatedWord[];
  guesses: string[];
}

export interface SummeryTable {
  hebrew: string;
  english: string;
  isCorrect: boolean;
}

@Component({
  selector: 'app-gameover',
  standalone: true,
  imports: [
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './gameover.component.html',
  styleUrl: './gameover.component.css',
})
export class GameoverComponent {
  displayedColumns: string[] = ['hebrew', 'english', 'iscorrect'];
  dataFromGame: GameOverData;
  dataSource: SummeryTable[];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.dataFromGame = navigation?.extras?.state?.['data'] as GameOverData;

    // עבור כל צמד מילים
    this.dataSource = this.dataFromGame.words.map((translatedword, index) => ({
      // נחלץ את המילה בעברית
      hebrew: translatedword.target,
      // נחלץ את המילה באנגלית
      english: translatedword.origin,
      // נבדוק אם הניחוש של המשתמש היה נכון
      isCorrect:
        this.dataFromGame.guesses[index].toLowerCase() ==
        this.dataFromGame.words[index].origin.toLowerCase(),
    }));
  }

  getIcon(success: boolean): string {
    return success ? 'check_circle' : 'cancel';
  }
  goToNewGame() {
    this.router.navigate(['choose-game']);
  }
}
