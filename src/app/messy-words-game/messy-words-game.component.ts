import { PlayerSucceedComponent } from './../player-succeed/player-succeed.component';
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
import { MatDialog } from '@angular/material/dialog';
import { GameoverComponent } from '../gameover/gameover.component';

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
  words: TranslatedWord[] = [];
  wordIndex: number = 0;
  messyWord: string = '';
  playerProgress: number = 0;
  endgame = false;
  pointsGame: number = 0;
  durationSecondsGame: number = 0;
  allGuesses: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private mcs: ManageCategoriesService,
    private dialog: MatDialog
  ) {
    let categoryId = this.route.snapshot.paramMap.get('categoryId');
    if (categoryId != null) {
      this.category = this.mcs.get(parseInt(categoryId));
      this.words = this.category.words;
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
    this.messyWord = [...origWord]
      .sort(() => Math.random() - 0.5)
      .join(' ')
      .toUpperCase();
  }

  goToNextWord() {
    // אם השחקן כתב ניחוש כל שהוא
    if (this.playerGuess != '') {
      if (this.wordIndex == this.words.length - 1) {
        this.goToGameOver();
      } else {
        const winDialog = this.dialog.open(PlayerSucceedComponent, {
          data: {
            isWin:
              this.playerGuess.toLowerCase() ==
              this.words[this.wordIndex].origin.toLowerCase(),
          },
        });

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

  goToGameOver() {
    const winDialog = this.dialog.open(GameoverComponent, {
      data: {},
    });
  }
}
