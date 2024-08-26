import { PlayerSucceedComponent } from './../player-succeed/player-succeed.component';
import { WordsCategory } from './../shared/model/words-category';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { GamePointsComponent } from '../game-points/game-points.component';

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
    GamePointsComponent,
  ],
  templateUrl: './messy-words-game.component.html',
  styleUrl: './messy-words-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessyWordsGameComponent {
  @Input() playerGuess: string = '';
  category: WordsCategory;
  wordIndex: number = 0;
  messyWord: string = '';
  playerProgress: number = 0;
  durationSecondsGame: number = 0;
  allGuesses: string[] = [];
  points: number = 0;
  isLastGuessCorrect: boolean = false;
  pointsPerCorrect: number = 0;
  correctGuesses: number = 0;

  constructor(
    private route: ActivatedRoute,
    private mcs: ManageCategoriesService,
    private dialog: MatDialog,
    private router: Router
  ) {
    let categoryId = this.route.snapshot.paramMap.get('categoryId');
    if (categoryId != null) {
      this.category = this.mcs.get(parseInt(categoryId));

      // כל ניחוש נכון הוא 100 לחלק לכמות המילים שיש בקטגוריה
      this.pointsPerCorrect = Math.floor(100 / this.category.words.length);

      // נערבב את המילה הראשונה
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

  showNextWord() {
    // לפני שעוברים למילה הבאה - נציג דיאלוג האם הניחוש הנוכחי היה נכון או לא
    this.dialog.open(PlayerSucceedComponent, {
      data: {
        isWin: this.isLastGuessCorrect,
      },
    });

    // נאפס את הניחוש עבור המילה הבאה
    this.resetGuess();

    // נעבור למילה הבאה
    this.wordIndex++;

    // נערבב את האותיות
    this.mixCurrentWord();

    // נציג את ההתקדמות הנכונה באחוזים
    this.playerProgress = Math.round(
      (this.wordIndex / this.category.words.length) * 100
    );

    // נציג את המילה המעורבבת הבאה
    this.mixCurrentWord();
  }

  goToNextSomething() {
    // אם השחקן לא כתב ניחוש בכלל
    if (this.playerGuess == '') {
      // אין צורך לעשות דבר - נצא מהמתודה
      return;
    }

    // האם הניחוש האחרון היה נכון או לא
    this.isLastGuessCorrect =
      this.playerGuess.toLowerCase() ==
      this.category.words[this.wordIndex].origin.toLowerCase();

    // אם השחקן צדק נעלה לו את הניקוד
    if (this.isLastGuessCorrect) {
      // סופרים כמה פעמים הוא צדק כדי להציג במסך הסיכום
      this.correctGuesses++;

      console.log('adding ', Math.floor(100 / this.category.words.length));
      // נשתמש בכמות הנקודות שחישבנו בהתחלה
      this.points += this.pointsPerCorrect;
    }

    // נשמור את הניחוש האחרון
    this.allGuesses.push(this.playerGuess);

    // אם אנחנו במילה האחרונה
    if (this.wordIndex == this.category.words.length - 1) {
      // נציג את מסך הסיכום
      this.goToGameOver();
    } else {
      // נעבור למילה הבאה
      this.showNextWord();
    }
  }

  goToGameOver() {
    this.router.navigate(['/gameover'], {
      state: {
        data: {
          categoryName: this.category.name,
          points: this.points,
          correctGuesses: this.correctGuesses,
          words: this.category.words,
          guesses: this.allGuesses,
        },
      },
    });
  }
}
