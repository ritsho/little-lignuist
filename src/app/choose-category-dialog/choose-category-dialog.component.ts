import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-choose-category-dialog',
  standalone: true,
  imports: [MatSelectModule, MatOptionModule, NgFor],
  templateUrl: './choose-category-dialog.component.html',
  styleUrl: './choose-category-dialog.component.css'
})
export class ChooseCategoryDialogComponent {
  public categories: string[] =[];
  public selectedCategory: string ='';
  

  constructor() {
    this.categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'];
  }
}
