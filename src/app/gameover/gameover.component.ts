import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { TranslatedWord } from '../shared/model/translated-word';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export interface GameOverData {
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
  imports: [MatDialogModule, MatTableModule, MatIconModule, CommonModule],
  templateUrl: './gameover.component.html',
  styleUrl: './gameover.component.css',
})
export class GameoverComponent {
  displayedColumns: string[] = ['hebrew', 'english', 'iscorrect'];
  dataSource: SummeryTable[];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const data = navigation?.extras?.state?.['data'] as GameOverData;

    // עבור כל צמד מילים
    this.dataSource = data.words.map((translatedword, index) => ({
      // נחלץ את המילה בעברית
      hebrew: translatedword.origin,
      // נחלץ את המילה באנגלית
      english: translatedword.target,
      // נבדוק אם הניחוש של המשתמש היה נכון
      isCorrect: data.guesses[index] == data.words[index].target,
    }));
  }

  getIcon(success: boolean): string {
    return success ? 'check_circle' : 'cancel';
  }
  goToNewGame(){
    this.router.navigate(['choose-game']);
  }
}
