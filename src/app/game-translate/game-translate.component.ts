import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { WordsCategory } from '../shared/WordsCategory';
import { ManageCategoriesService } from '../manage-categories.service';
import { NgFor, CommonModule} from '@angular/common';
import { LanguageEnum } from '../shared/LanguageEnum';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-translate',
  standalone: true,
  templateUrl: './game-translate.component.html',
  styleUrl: './game-translate.component.css',
  imports: [FooterComponent, HeaderComponent, NgFor, CommonModule]
})
export class GameTranslateComponent implements OnInit {
  wordsCategory!: WordsCategory;

  constructor(private mc: ManageCategoriesService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null){
      this.wordsCategory = this.mc.get(parseInt(id));
    }
  }

  onShowTranslate() {

  }
  onCheck() {

  }

}
