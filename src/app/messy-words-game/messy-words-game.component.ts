import { WordsCategory } from './../shared/model/words-category';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManageCategoriesService } from '../shared/services/manage-categories.service';
import { ExitButtonComponent } from '../exit-button/exit-button.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { TranslatedWord } from '../shared/model/translated-word';
import { MatIconModule } from '@angular/material/icon';
import { LanguageEnum } from '../shared/model/language-enum';

@Component({
  selector: 'app-messy-words-game',
  standalone: true,
  imports: [
    ExitButtonComponent,
    MatProgressBarModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './messy-words-game.component.html',
  styleUrl: './messy-words-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessyWordsGameComponent {
  @Input() playerGuess: string = '';
  category: WordsCategory;
  WordsCategory: TranslatedWord[] = [];
  wordIndex: number = 0;
  messyWord: string = '';
  playerProgress: number = 0;
  endgame = false;
  pointsGame: number = 0;
  durationSecondsGame: number = 0;
  allGuesses: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private mcs: ManageCategoriesService
  ) {
    let categoryId = this.route.snapshot.paramMap.get('categoryId');
    if (categoryId != null) {
      this.category = this.mcs.get(parseInt(categoryId));
      this.WordsCategory = this.category.words;
      console.log(this.category?.words.length);
      this.mixCurrentWord();
    } else {
      this.category = new WordsCategory(
        'name',
        1,
        LanguageEnum.English,
        LanguageEnum.Hebrew,
        []
      );
    }
  }

  resetGuess() {
    this.playerGuess = '';
  }

  mixCurrentWord() {
    let origWord = this.category.words[this.wordIndex].origin;
    this.messyWord = [...this.WordsCategory[this.wordIndex] ['origin']]
      .sort(() => Math.random() - 0.5)
      .join('');
    // TODO: נערבב את האותיות

    // TODO: נשמור את התוצאה ונציג אותה...
  }

  goToNextWord() {
    
    // אם השחקן כתב ניחוש כל שהוא
    if (this.playerGuess != '') {
      this.allGuesses.push(this.playerGuess);
      // נאפס את הניחוש עבור המילה הבאה
      this.resetGuess();
      // נעבור למילה הבאה
      this.wordIndex++;
      this.mixCurrentWord();
      // נציג את ההתקדמות הנכונה באחוזים
      this.playerProgress = Math.round(
        (this.wordIndex / this.category.words.length) * 100
      );

      // נציג את המילה המעורבבת הבאה
      this.mixCurrentWord();
    }
  }
}
