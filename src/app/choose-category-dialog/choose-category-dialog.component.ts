import { WordsCategory } from './../shared/model/words-category';
import { ManageCategoriesService } from './../shared/services/manage-categories.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgFor, DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { GameProfile } from '../shared/model/GameProfile';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-choose-category-dialog',
  standalone: true,
  imports: [
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    NgFor,
    MatDialogClose,
    DatePipe,
    CommonModule,
  ],
  templateUrl: './choose-category-dialog.component.html',
  styleUrl: './choose-category-dialog.component.css',
})
export class ChooseCategoryDialogComponent implements OnInit {
  public categories: WordsCategory[] = [];

  public selectedCategory: WordsCategory | undefined;

  constructor(
    private mcs: ManageCategoriesService,
    @Inject(MAT_DIALOG_DATA)
    public selectedGameProfile: GameProfile,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    // get list of all categories
    this.categories = await this.mcs.list();
  }

  playGame() {
    if (
      this.selectedGameProfile != undefined &&
      this.selectedCategory != undefined
    ) {
      const gameUrl = this.selectedGameProfile.url;
      const category = this.selectedCategory.id;
      this.router.navigate([gameUrl, category]);
    }
  }
}
