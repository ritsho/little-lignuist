import { Component, OnInit } from '@angular/core';
import { ManageCategoriesService } from '../manage-categories.service'
import { WordsCategory } from '../shared/WordsCategory';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-game-choice',
  standalone: true,
  templateUrl: './game-choice.component.html',
  styleUrl: './game-choice.component.css',
  imports: [FooterComponent, HeaderComponent, NgFor]
})
export class GameChoiceComponent implements OnInit {

  wordCategories: WordsCategory[] = [];

  constructor(private mc: ManageCategoriesService) {
  }
  
  onPlayButton(wordsCategoryId: string) {
    console.log(wordsCategoryId);
    // TODO: Navigate to new game with selected category
  }

  ngOnInit(): void {
    this.wordCategories = this.mc.list();
  }
}

