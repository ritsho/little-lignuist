// import { CommonModule } from "@angular/common";
// import { Component, ChangeDetectionStrategy, OnInit, Input } from "@angular/core";
// import { FormsModule } from "@angular/forms";
// import { MatButtonModule } from "@angular/material/button";
// import { MatInputModule } from "@angular/material/input";
// import { MatProgressBarModule } from "@angular/material/progress-bar";
// import { ActivatedRoute } from "@angular/router";
// import { ExitButtonComponent } from "../exit-button/exit-button.component";
// import { TranslatedWord } from "../shared/model/translated-word";
// import { WordsCategory } from "../shared/model/words-category";
// import { ManageCategoriesService } from "../shared/services/manage-categories.service";


// @Component({
//   selector: 'app-messy-words-game',
//   standalone: true,
//   imports: [ExitButtonComponent, MatProgressBarModule, MatButtonModule, CommonModule, MatInputModule, FormsModule],

//   templateUrl: './messy-words-game.component.html',
//   styleUrl: './messy-words-game.component.css',
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class MessyWordsGameComponent implements OnInit {
//   startgame = true;
//   @Input() playerGuess: string = "";
//   category: WordsCategory | undefined;
//   WordsCategory?: TranslatedWord[];
//   playerIndex: number = -1;
//   messyWord: string = "";
//   playerProgress: number = 0;
//   endgame = false;
//   trygame: number = 5;
//   pointsgame: number = 10;
//   points: number = 0;
//   durationgame: number = 0;
//   playerGuess: string = '';


//   constructor(private route: ActivatedRoute, private mcs: ManageCategoriesService) {
//     let categoryId = this.route.snapshot.paramMap.get('categoryId');
//     if (categoryId != null) {
//       this.category = this.mcs.get(parseInt(categoryId));
//       console.log(this.category.words.length);
//       this.mixCurrentWord();
//     }
//   }
//   ngOnInit(): void {
//     throw new Error('Method not implemented.');
//   }

//   resetGuess() {
//     this.playerGuess = "";
//   }

//   mixCurrentWord() {
//     let origWord = this.category.words[this.playerIndex].origin;
//     // TODO: נערבב את האותיות
//     // TODO: נשמור את התוצאה ונציג אותה...
//   }

//   goToNextWord() {
//     // אם השחקן כתב ניחוש כל שהוא
//     if (this.playerGuess != "") {
//       // TODO: לבדוק את הניחוש
//       // נאפס את הניחוש עבור המילה הבאה
//       this.resetGuess();
//       // נעבור למילה הבאה
//       this.playerIndex++;
//       // נציג את ההתקדמות הנכונה באחוזים
//       this.playerProgress = Math.round(this.playerIndex / this.category?.words?.length  * 100);
//       // נציג את המילה המעורבבת הבאה
//       this.mixCurrentWord();
//     }
//   }
// }
