import { ManageCategoriesService } from './../shared/services/manage-categories.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WordsCategory } from '../shared/model/words-category';

@Component({
  selector: 'app-sort-words-game',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './sort-words-game.component.html',
  styleUrl: './sort-words-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortWordsGameComponent {
  public category: WordsCategory | undefined;

  constructor(private route: ActivatedRoute, private mcs: ManageCategoriesService) {
    let categoryId = this.route.snapshot.paramMap.get('categoryId');
    if (categoryId != null) {
      this.category = this.mcs.get(parseInt(categoryId));
    }
  }

}
