import { Component } from '@angular/core';
import { TranslatedWord } from '../shared/model/translated-word';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { WordsCategory } from '../shared/model/words-category';

export interface SortGameOverData {
  category: WordsCategory;
  randomCategory: WordsCategory;
  correctGuesses: number;
  points: number;
  words: TranslatedWord[];
  guesses: boolean[];
}

export interface SortSummeryTable {
  english: string;
  category: string;
  guess: boolean;
  isCorrect: boolean;
}
@Component({
  selector: 'app-sort-game-over',
  standalone: true,
  imports: [  MatDialogModule,
    MatTableModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,],
  templateUrl: './sort-game-over.component.html',
  styleUrl: './sort-game-over.component.css'
})
export class SortGameOverComponent {
  displayedColumns: string[] = ['english', 'category', 'guess', 'iscorrect'];
  dataFromGame: SortGameOverData;
  dataSource: SortSummeryTable[];

  constructor(private router: Router){
    const navigation = this.router.getCurrentNavigation();
    this.dataFromGame = navigation?.extras?.state?.['data'] as SortGameOverData;

     // עבור כל צמד מילים
     this.dataSource = this.dataFromGame.words.map((translatedword, index) => ({
      // נחלץ את המילה באנגלית
      english: translatedword.origin,
      // נמצא באיזה קטגוריה המילה נמצאת
      category:  this.findCorrectCategory(translatedword.origin),
      guess: this.dataFromGame.guesses[index],
      // נבדוק אם הניחוש של המשתמש היה נכון
      isCorrect: this.isGuessCorrect(translatedword.origin, this.dataFromGame.category,
         this.dataFromGame.guesses[index])
      }));
  } 

  findCorrectCategory(word:string){
    // אם המילה נמצאת בקטגוריה הראשית
    if (this.dataFromGame.category.words.some(tw => tw.origin == word)){
      // נחזיר את השם שלה
      return this.dataFromGame.category.name;
    }
    // אחרת, נחזיר את השם של הקטגוריה השניה
    return this.dataFromGame.randomCategory.name;
  }
  isGuessCorrect(word: string, category: WordsCategory, guess: boolean): boolean {
    // אם המשתמש ניחש 'כן' והמילה באמת נמצאת בקטגוריה
    // או אם המשתמש ניחש לא, והמילה לא בקטגוריה
    if (guess && category.words.some(tw => tw.origin == word) ||
      !guess && !category.words.some(tw => tw.origin == word)) {
      // המשתמש צדק
      return true;
    }
    // המשתמש טעה
    return false;
  }

  goToNewGame(){
    this.router.navigate(['/choose-game']);
  }
}
