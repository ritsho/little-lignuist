import { ManageCategoriesService } from './../shared/services/manage-categories.service';
import { ManageGameResultsService } from './../shared/services/manage-gameresult';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dasboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dasboard.component.html',
  styleUrl: './dasboard.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DasboardComponent implements OnInit {
  isLoading: boolean = false;
  gamesPlayed: number = 0;
  totalPoints: number = 0;
  categoriesLernt: number = 0;
  categoriesNotLernt: number = 0;
  categoriesLerntPercent: number = 0;
  highesScoreGame: string = '';
  mostPlayedCategory: string = '';
  totalPerfectGamesPercent: number = 0;
  daysStrike: number = 0;
  gamesThisMonth: number = 0;
  leftToCompleteChallange: number = 0;

  constructor(
    private mgrs: ManageGameResultsService,
    private mcs: ManageCategoriesService
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    const categories = await this.mcs.list();
    const gameResults = await this.mgrs.list();

    // כמות המשחקים ששיחק עד עכשיו
    this.gamesPlayed = gameResults.length;

    // סך כל הנקודות עד עכשיו
    gameResults.forEach((gr) => (this.totalPoints += gr.score));
    this.totalPoints = Math.floor(this.totalPoints);

    // רשימה ייחודית של הקטגוריות שלמדו
    this.categoriesLernt = Array.from(
      new Set(gameResults.map((item) => item.categoryId))
    ).length;

    // נחשב כמה קטגוריות עדיין לא למדו
    this.categoriesNotLernt = categories.length - this.categoriesLernt;
    this.categoriesLerntPercent = Math.floor(
      (this.categoriesLernt / categories.length) * 100
    );

    // הקטגוריה ששיחקו בה הכי הרבה
    const mostPlayerCategoryId = this.mgrs.findMostPlayedCategory(gameResults);
    const mostPlayedCategory = categories.find(
      (c) => c.id == mostPlayerCategoryId
    );
    if (mostPlayedCategory) {
      this.mostPlayedCategory = mostPlayedCategory.name;
    }

    // משחקים מושלמים - משחקים עם ציון 100
    const totalPerfectGames = gameResults.filter(
      (gr) => gr.score >= 100
    ).length;
    const totalGames = gameResults.length;
    const totalPerfectGamerPercentage = Math.floor(
      (totalPerfectGames / totalGames) * 100
    );

    this.totalPerfectGamesPercent = totalPerfectGamerPercentage;

    // כמה משחקים היו החודש הנוכחי
    this.gamesThisMonth = this.mgrs.getTotalDaysOnCurrentMonth(gameResults);
    this.leftToCompleteChallange = 20 - this.gamesThisMonth;

    this.daysStrike = this.mgrs.getDaysStrikeSinceToday(gameResults);

    this.isLoading = false;
  }
}
