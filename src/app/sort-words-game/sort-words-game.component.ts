import { ManageCategoriesService } from './../shared/services/manage-categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WordsCategory } from '../shared/model/words-category';
import { LanguageEnum } from '../shared/model/language-enum';
import { TranslatedWord } from '../shared/model/translated-word';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { PlayerSucceedComponent } from '../player-succeed/player-succeed.component';
import { GamePointsComponent } from '../game-points/game-points.component';
import { ExitButtonComponent } from '../exit-button/exit-button.component';

@Component({
  selector: 'app-sort-words-game',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatButtonModule,
    GamePointsComponent,
    ExitButtonComponent,
  ],
  templateUrl: './sort-words-game.component.html',
  styleUrl: './sort-words-game.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SortWordsGameComponent implements OnInit {
  public category: WordsCategory;
  public words: TranslatedWord[] = [];
  public currentWord: string = '';
  public currentWordIndex: number = 0;
  public playerProgress: number = 0;
  public points: number = 0;
  public isLoading: boolean = false;

  private categoryIdFromRoute: string | null;
  private isEndGame: boolean = false;
  private guesses: boolean[] = [];
  private pointsPerCorrect: number = 0;
  private correctGuesses: number = 0;
  private randomCategory: WordsCategory;

  constructor(
    private route: ActivatedRoute,
    private mcs: ManageCategoriesService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.category = new WordsCategory(
      'fake',
      '1',
      LanguageEnum.English,
      LanguageEnum.Hebrew,
      []
    );
    this.randomCategory = new WordsCategory(
      'fake2',
      '2',
      LanguageEnum.English,
      LanguageEnum.Hebrew,
      []
    );

    this.categoryIdFromRoute = this.route.snapshot.paramMap.get('categoryId');
  }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;

    if (this.categoryIdFromRoute != null) {
      this.mcs.get(this.categoryIdFromRoute).then((tempCategory) => {
        if (!tempCategory) {
          console.log('invalid category id: ', this.categoryIdFromRoute);
          return;
        }
        this.category = tempCategory;

        this.mcs.list().then((allCategories) => {
          this.randomCategory = this.getRandomCateogory(
            this.category,
            allCategories
          );

          this.words = this.getWordsFromCategory(this.category, 3);
          const randomWordsFromOther = this.getWordsFromCategory(
            this.randomCategory,
            3
          );

          this.words = this.words.concat(randomWordsFromOther);
          this.words = [...this.words].sort(() => Math.random() - 0.5);
          // console.log(this.words);

          // כל ניחוש נכון הוא 100 לחלק לכמות המילים שיש בקטגוריה
          this.pointsPerCorrect = Math.floor(100 / this.words.length);

          this.showNextWord();

          this.isLoading = false;
        });
      });
    }
  }

  getRandomCateogory(
    category: WordsCategory,
    allCategories: WordsCategory[]
  ): WordsCategory {
    allCategories = allCategories.filter((c) => c.id != category.id);
    const randomCategory =
      allCategories[Math.floor(Math.random() * allCategories.length)];
    return randomCategory;
  }

  getWordsFromCategory(
    category: WordsCategory,
    count: number
  ): TranslatedWord[] {
    const randomWords = category.words
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
    return randomWords;
  }

  onNoClick() {
    this.onPlayerGuess(false);
  }
  onYesClick() {
    this.onPlayerGuess(true);
  }

  showNextWord() {
    this.currentWord = this.words[this.currentWordIndex].origin;
  }

  isGuessCorrect(
    word: string,
    category: WordsCategory,
    guess: boolean
  ): boolean {
    // אם המשתמש ניחש 'כן' והמילה באמת נמצאת בקטגוריה
    // או אם המשתמש ניחש לא, והמילה לא בקטגוריה
    if (
      (guess && category.words.some((tw) => tw.origin == word)) ||
      (!guess && !category.words.some((tw) => tw.origin == word))
    ) {
      // המשתמש צדק
      return true;
    }
    // המשתמש טעה
    return false;
  }

  onPlayerGuess(guess: boolean) {
    // נשמור את הניחוש
    this.guesses[this.currentWordIndex] = guess;
    const isCorrect = this.isGuessCorrect(
      this.currentWord,
      this.category,
      guess
    );

    if (isCorrect) {
      this.points += this.pointsPerCorrect;
      this.correctGuesses++;
    }

    this.currentWordIndex++;

    if (this.currentWordIndex == 6) {
      this.isEndGame = true;
    }

    if (this.isEndGame) {
      this.router.navigate(['/sort-game-over'], {
        state: {
          data: {
            category: this.category,
            randomCategory: this.randomCategory,
            correctGuesses: this.correctGuesses,
            points: this.points,
            words: this.words,
            guesses: this.guesses,
          },
        },
      });
    } else {
      this.dialog.open(PlayerSucceedComponent, {
        data: {
          isWin: isCorrect,
        },
      });

      // נציג את ההתקדמות הנכונה באחוזים
      this.playerProgress = Math.round(
        (this.currentWordIndex / this.words.length) * 100
      );
      this.showNextWord();
    }
  }
}
