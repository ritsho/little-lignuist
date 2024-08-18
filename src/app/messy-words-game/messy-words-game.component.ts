import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordsCategory } from '../shared/model/words-category';
import { ManageCategoriesService } from '../shared/services/manage-categories.service';
import { ExitButtonComponent } from "../exit-button/exit-button.component";

@Component({
  selector: 'app-messy-words-game',
  standalone: true,
  imports: [ExitButtonComponent]
  ,
  templateUrl: './messy-words-game.component.html',
  styleUrl: './messy-words-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessyWordsGameComponent {
  
  category: WordsCategory | undefined;

  constructor(private route: ActivatedRoute, private mcs: ManageCategoriesService) {
    let categoryId = this.route.snapshot.paramMap.get('categoryId');
    if (categoryId != null) {
      this.category = this.mcs.get(parseInt(categoryId));
    }
  }
 }
