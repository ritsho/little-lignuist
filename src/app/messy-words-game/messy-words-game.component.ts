import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordsCategory } from '../shared/model/words-category';
import { ManageCategoriesService } from '../shared/services/manage-categories.service';
import { ExitButtonComponent } from "../exit-button/exit-button.component";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-messy-words-game',
  standalone: true,
  imports: [ExitButtonComponent, MatProgressBarModule, MatButtonModule, CommonModule, MatInputModule, FormsModule]
  ,
  templateUrl: './messy-words-game.component.html',
  styleUrl: './messy-words-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessyWordsGameComponent {

  category!: WordsCategory;
  playerIndex: number = 0;
  playerProgress: number = 0;
  playerGuess: string = "";
  messyWord: string = "";

  constructor(private route: ActivatedRoute, private mcs: ManageCategoriesService) {
    let categoryId = this.route.snapshot.paramMap.get('categoryId');
    if (categoryId != null) {
      this.category = this.mcs.get(parseInt(categoryId));
      console.log(this.category.words.length);
      this.mixCurrentWord();
    }
  }

  resetWord() {
    this.playerGuess = "";
  }

  mixCurrentWord() {
    let origWord = this.category.words[this.playerIndex].origin;
    // נשיג את האותיות בתור מערך
    let letters = origWord.split('');
    let shuffledWord = '';

    while (letters.length > 0) {
      // נבחר אות רנדומלית
      let randomIndex = Math.floor(Math.random() * letters.length);
      // נסיר את האות מהמילה המקורית, ונוסיף למערך המילים המבולגנות
      shuffledWord += letters.splice(randomIndex, 1) + " ";
    }
    this.messyWord = shuffledWord.toUpperCase();
  }

  goToNextWord() {
    this.playerIndex++;
    this.playerProgress = Math.round(this.playerIndex / this.category.words.length * 100);
    this.mixCurrentWord();
  }
}
