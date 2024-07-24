import { WordsCategory } from './../shared/model/words-category';
import { ManageCategoriesService } from './../shared/services/manage-categories.service';
import { Component, Input } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgFor, DatePipe } from '@angular/common';
import { MatDialogClose } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-choose-category-dialog',
  standalone: true,
  imports: [MatSelectModule, MatOptionModule, NgFor, MatDialogClose, DatePipe, CommonModule],
  templateUrl: './choose-category-dialog.component.html',
  styleUrl: './choose-category-dialog.component.css'
})
export class ChooseCategoryDialogComponent {
  public categories: WordsCategory[] = [];

  @Input()
  public selectedCategory: WordsCategory | undefined;

  constructor(private mcs: ManageCategoriesService) {
    this.categories = this.mcs.list();


    // אם בחרו קטגוריה אז משהו
    if ( this.selectedCategory != undefined){
        //  show!
    }
  }
}
