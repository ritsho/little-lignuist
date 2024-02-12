import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { WordsCategory } from '../shared/WordsCategory';
import { ManageCategoriesService } from '../manage-categories.service';
import { NgFor, CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { GameWords } from '../shared/GameWords';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-game-translate',
  standalone: true,
  templateUrl: './game-translate.component.html',
  styleUrl: './game-translate.component.css',
  imports: [FooterComponent, HeaderComponent, NgFor, CommonModule, MatButtonModule, MatInputModule,
    MatSelectModule, MatFormFieldModule, MatOptionModule, FormsModule, MatIconModule,
    MatDividerModule, MatListModule, MatTableModule]
})
export class GameTranslateComponent implements OnInit {
  wordsCategory!: WordsCategory;
  gameWords: GameWords[] = [];
  displayedColumns = ['origin-col', 'userinput-col', 'is-correct-col'];
  isCheckButtonWasClicked = false;

  constructor(private mc: ManageCategoriesService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      this.wordsCategory = this.mc.get(parseInt(id));

      //copy all words to the new array
      this.wordsCategory.words.forEach(translatedWord => {
        this.gameWords.push(new GameWords(translatedWord.origin, translatedWord.target));
      });
    };
  }


  onShowTranslate() {

  }
  onCheck() {
    this.gameWords.forEach(item => {

      if (item.target == item.userinput) {
        item.isCorrect = true;
      } else {
        item.isCorrect = false;
      }
    });
    this.isCheckButtonWasClicked = true;
  }
}
