import { TranslatedWord } from './../shared/model/translated-word';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemoryCard } from '../shared/model/memory-card';
import { ManageCategoriesService } from '../shared/services/manage-categories.service';
import { CommonModule } from '@angular/common';
import { WordsCategory } from '../shared/model/words-category';
import { GamePointsComponent } from '../game-points/game-points.component';
import { ManageGameResultsService } from '../shared/services/manage-gameresult';
import { GameResult } from '../shared/model/game-result';
import { GameIdsEnum } from '../shared/model/game-ids';

@Component({
  selector: 'app-memory-game',
  standalone: true,
  imports: [CommonModule, GamePointsComponent],
  templateUrl: './memory-game.component.html',
  styleUrl: './memory-game.component.css',
})
export class MemoryGameComponent implements OnInit {
  category: WordsCategory | undefined = undefined;
  words: MemoryCard[] = [];
  currentFlippedCards: MemoryCard[] = [];
  points: number = 0;
  tries: number = 0;
  maximumPoints: number = 100;

  constructor(
    private activatedRoute: ActivatedRoute,
    private mc: ManageCategoriesService,
    private mgr: ManageGameResultsService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    // נשיג את הקטגוריה הנוכחית
    const id = this.activatedRoute.snapshot.paramMap.get('categoryId');
    if (id != null) {
      // נשיג את כל המילים מהקטגוריה
      this.mc.get(id).then((tempCategory) => {
        if (!tempCategory) {
          console.log('invalid category id: ', id);
          return;
        }
        this.category = tempCategory;

        for (let index = 0; index < tempCategory.words.length; index++) {
          const translatedWord = tempCategory.words[index];

          this.words.push(
            new MemoryCard(
              translatedWord.origin,
              translatedWord.target,
              false,
              false,
              false
            )
          );
          this.words.push(
            new MemoryCard(
              translatedWord.target,
              translatedWord.origin,
              false,
              true,
              false
            )
          );
        }

        this.shuffleCards();
      });
    }
  }

  flipCard(card: MemoryCard): void {
    if (card.isFlipped) return;

    card.isFlipped = true;
    this.currentFlippedCards.push(card);
    if (this.currentFlippedCards.length == 2) {
      // let animation work... and only after 1 second - check match
      setTimeout(() => this.checkMatch(), 1000);
    }
  }

  shuffleCards(): void {
    for (let i = this.words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.words[i], this.words[j]] = [this.words[j], this.words[i]];
    }
  }

  checkMatch(): void {
    this.tries++;

    const [card1, card2] = this.currentFlippedCards;
    const isMatch =
      // כל כרטיס חייב להיות בשפה שונה
      ((card1.isTarget && !card2.isTarget) ||
        (!card1.isTarget && card2.isTarget)) &&
      // המילה היא התרגום של הצד השני
      card1.word === card2.translation &&
      card2.word === card1.translation;

    console.log(isMatch, card1, card2);
    if (isMatch) {
      card1.isMatched = card2.isMatched = true;
      this.points += Math.floor(this.maximumPoints / (this.words.length / 2));

      // אם כל הקלפים הותאמו - המשחק נגמר
      if (this.words.filter((w) => !w.isMatched).length == 0) {
        this.mgr
          .addGameResult(
            new GameResult(
              this.category?.id,
              GameIdsEnum.MemoryGame,
              this.points
            )
          )
          .then(() => {
            this.router.navigate(['/memory-game-over'], {
              state: {
                data: {
                  category: this.category,
                  tries: this.tries,
                  points: this.points,
                  words: this.words,
                },
              },
            });
          });
      }
    } else {
      card1.isFlipped = card2.isFlipped = false;
      this.maximumPoints -= 2;
    }

    this.currentFlippedCards = [];
  }

  calcPoints(): void {}
}
