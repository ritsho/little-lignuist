import { PlayerSucceedComponent } from './../player-succeed/player-succeed.component';
import { WordsCategory } from './../shared/model/words-category';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageCategoriesService } from '../shared/services/manage-categories.service';
import { ExitButtonComponent } from '../exit-button/exit-button.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LanguageEnum } from '../shared/model/language-enum';
import { MatDialog } from '@angular/material/dialog';
import { GamePointsComponent } from '../game-points/game-points.component';
import { TranslatedWord } from '../shared/model/translated-word';
import { ManageGameResultsService } from '../shared/services/manage-gameresult';
import { GameResult } from '../shared/model/game-result';
import { GameIdsEnum } from '../shared/model/game-ids';

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
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MessyWordsGameComponent implements OnInit {
  @Input() playerGuess: string = '';
  categoryIdFromRoute: string | null = '';
  category: WordsCategory;
  wordIndex: number = 0;
  messyWord: string = '';
  playerProgress: number = 0;
  durationSecondsGame: number = 0;
  words: TranslatedWord[] = [];
  allGuesses: string[] = [];
  points: number = 0;
  isLastGuessCorrect: boolean = false;
  pointsPerCorrect: number = 0;
  correctGuesses: number = 0;

  constructor(
    private route: ActivatedRoute,
    private mcs: ManageCategoriesService,
    private mgr: ManageGameResultsService,
    private dialog: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.categoryIdFromRoute = this.route.snapshot.paramMap.get('categoryId');

    this.category = new WordsCategory(
      'fake-name',
      '1',
      LanguageEnum.English,
      LanguageEnum.Hebrew,
      []
    );
  }

  async ngOnInit(): Promise<void> {
    if (!this.categoryIdFromRoute) {
      console.log('invalid category id selected:', this.categoryIdFromRoute);
      return;
    }
    const tempCateogry = await this.mcs.get(this.categoryIdFromRoute);
    if (!tempCateogry) {
      console.log(
        'category id is valid, but not found in firebase:',
        this.categoryIdFromRoute
      );
      return;
    }
    this.category = tempCateogry;
    this.words = [...this.category.words].sort(() => Math.random() - 0.5);

    // כל ניחוש נכון הוא 100 לחלק לכמות המילים שיש בקטגוריה
    this.pointsPerCorrect = Math.floor(100 / this.words.length);

    // נערבב את המילה הראשונה
    this.mixCurrentWord();
  }

  resetGuess() {
    this.playerGuess = '';
  }

  mixCurrentWord() {
    const origWord = this.words[this.wordIndex].origin;
    let tempWord = origWord;
    while (tempWord == origWord) {
      tempWord = [...origWord].sort(() => Math.random() - 0.5).join('');
      this.messyWord = [...tempWord].join(' ').toUpperCase();
    }
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
      (this.wordIndex / this.words.length) * 100
    );

    // נציג את המילה המעורבבת הבאה
    this.mixCurrentWord();
  }

  async goToNextSomething(): Promise<void> {
    // אם השחקן לא כתב ניחוש בכלל
    if (this.playerGuess == '') {
      // אין צורך לעשות דבר - נצא מהמתודה
      return;
    }

    // האם הניחוש האחרון היה נכון או לא
    this.isLastGuessCorrect =
      this.playerGuess.toLowerCase() ==
      this.words[this.wordIndex].origin.toLowerCase();

    // אם השחקן צדק נעלה לו את הניקוד
    if (this.isLastGuessCorrect) {
      // סופרים כמה פעמים הוא צדק כדי להציג במסך הסיכום
      this.correctGuesses++;

      console.log('adding ', this.pointsPerCorrect);
      // נשתמש בכמות הנקודות שחישבנו בהתחלה
      this.points += this.pointsPerCorrect;
    }

    // נשמור את הניחוש האחרון
    this.allGuesses.push(this.playerGuess);

    // אם אנחנו במילה האחרונה
    if (this.wordIndex == this.words.length - 1) {
      // נציג את מסך הסיכום
      await this.goToGameOver();
    } else {
      // נעבור למילה הבאה
      this.showNextWord();
    }
  }

  async goToGameOver(): Promise<void> {
    this.mgr.addGameResult(
      new GameResult(this.category.id, GameIdsEnum.MessyGame, this.points)
    );

    this.dialog.open(GamePointsComponent, { data: { points: this.points } });
    this.router.navigate(['/messy-game-over'], {
      state: {
        data: {
          categoryName: this.category.name,
          points: this.points,
          correctGuesses: this.correctGuesses,
          words: this.words,
          guesses: this.allGuesses,
        },
      },
    });
  }
}
