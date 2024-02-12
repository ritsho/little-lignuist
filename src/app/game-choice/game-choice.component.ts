import { Component, OnInit } from '@angular/core';
import { ManageCategoriesService } from '../manage-categories.service'
import { WordsCategory } from '../shared/words-category';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-game-choice',
  standalone: true,
  templateUrl: './game-choice.component.html',
  styleUrl: './game-choice.component.css',
  imports: [FooterComponent, HeaderComponent, NgFor, MatButtonModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatOptionModule]
})
export class GameChoiceComponent implements OnInit {

  wordCategories: WordsCategory[] = [];

  constructor(private mc: ManageCategoriesService, private router: Router) {
  }

  onPlayButton(wordsCategoryId: string) {
    if (wordsCategoryId == undefined) {
      alert("please choose category");
    } else {
      // Navigate to new game with selected category
      this.router.navigate(['newgame/' + wordsCategoryId]);
    }
  }

  ngOnInit(): void {
    this.wordCategories = this.mc.list();
  }
}

