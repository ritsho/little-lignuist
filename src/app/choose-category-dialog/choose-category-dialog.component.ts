import { WordsCategory } from './../shared/model/words-category';
import { ManageCategoriesService } from './../shared/services/manage-categories.service';
import { Component, Inject, Input } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgFor, DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { GameProfile } from '../shared/model/GameProfile';

export interface ChooseCategoryDialogData {
  gameProfile: GameProfile;
}

@Component({
  selector: 'app-choose-category-dialog',
  standalone: true,
  imports: [MatSelectModule, MatOptionModule, NgFor, MatDialogClose, DatePipe, CommonModule],
  templateUrl: './choose-category-dialog.component.html',
  styleUrl: './choose-category-dialog.component.css'
})
export class ChooseCategoryDialogComponent {
  public categories: WordsCategory[] = [];

  public selectedGameProfile: GameProfile | undefined;

  @Input()
  public selectedCategory: WordsCategory | undefined;

  constructor(private mcs: ManageCategoriesService,
    @Inject(MAT_DIALOG_DATA)
    public data: ChooseCategoryDialogData) {

    // get list of all categories
    this.categories = this.mcs.list();

    // save the selected game profile
    this.selectedGameProfile = this.data.gameProfile;
  }
}
