import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { WordsCategory } from '../shared/model/words-category';
import { ManageCategoriesService } from '../shared/services/manage-categories.service';
import { NgFor, CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { GameWords } from '../shared/model/game-words';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-game-translate',
  standalone: true,
  templateUrl: './game-translate.component.html',
  styleUrl: './game-translate.component.css',
  imports: [
    FooterComponent,
    HeaderComponent,
    NgFor,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    FormsModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
    MatSlideToggleModule,
  ],
})
export class GameTranslateComponent implements OnInit {
  wordsCategory!: WordsCategory;
  gameWords: GameWords[] = [];
  displayedColumns: string[] = [
    'origin-col',
    'userinput-col',
    'is-correct-col',
  ];
  isCheckButtonWasClicked: boolean = false;
  checkMessage: string = '';
  isShowTranslation: boolean = false;
  isLoading: boolean = false;

  constructor(
    private mc: ManageCategoriesService,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoading = true;

    const id = this.activatedRoute.snapshot.paramMap.get('categoryId');
    if (id != null) {
      this.mc.get(id).then((tempCategory) => {
        if (!tempCategory) {
          console.log('invalid category id: ', id);
          return;
        }
        this.wordsCategory = tempCategory;

        //copy all words to the new array
        this.wordsCategory.words.forEach((translatedWord) => {
          this.gameWords.push(
            new GameWords(translatedWord.origin, translatedWord.target)
          );
        });
        this.isLoading = false;
      });
    }
  }

  onCheck() {
    // it will show the emoji
    this.isCheckButtonWasClicked = true;

    let correctGuess = 0;

    this.gameWords.forEach((item) => {
      if (item.target == item.userinput) {
        item.isCorrect = true;
        correctGuess++;
      } else {
        item.isCorrect = false;
      }
    });

    // if everything is correct
    if (correctGuess == this.gameWords.length) {
      this.checkMessage = 'Well done, You finished!!!';
    } else {
      this.checkMessage = `You translated ${correctGuess} our of ${this.gameWords.length} words correctly, try again`;
    }
  }
}
