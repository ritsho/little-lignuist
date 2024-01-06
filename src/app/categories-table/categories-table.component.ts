import { Component } from '@angular/core';
import { LIST_OF_CATEGORIES, WordsCategory } from '../../main';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-categories-table',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.css'
})
export class CategoriesTableComponent {
  displayedColumns: string[] = ['name', 'zugot', 'last_change_date', 'actions'];
  my_data = LIST_OF_CATEGORIES;

  deleteItem(itemToRemove: WordsCategory) {
    this.my_data = this.my_data.filter(item => item !== itemToRemove);
  }

  editItem() {
    console.log("edit item - do nothing for now.");
  }

  newCategory() {
    console.log("add new item - do nothing for now.");
  }
}
