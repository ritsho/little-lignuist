import { Component } from '@angular/core';
import { LanguageEnum, WordsCategory } from '../../main';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-categories-table',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.css'
})
export class CategoriesTableComponent {
  displayedColumns: string[] = ['name', 'zugot', 'last_change_date', 'actions'];
  myData: WordsCategory[] = [
    new WordsCategory("Food", 1, new Date("1/1/2024"),
      LanguageEnum.English, LanguageEnum.Hebrew,
      new Map<string, string>([["Apple", "תפוח"], ["Orange", "תפוז"], ["Banana", "בננה"], ["Strawberry", "תות"]])),
  
    new WordsCategory("Family", 2, new Date("1/8/2023"),
      LanguageEnum.English, LanguageEnum.Hebrew,
      new Map<string, string>([["Father", "אבא"], ["Mother", "אמא"], ["Family", "משפחה"]])),
  
    new WordsCategory("Animals", 3, new Date("1/5/2022"),
      LanguageEnum.English, LanguageEnum.Hebrew,
      new Map<string, string>([["Dog", "כלב"], ["Elephant", "פיל"], ["Cat", "חתול"]]))
  ];

  deleteItem(itemToRemove: WordsCategory) {
    this.myData = this.myData.filter(item => item !== itemToRemove);
  }

  editItem() {
    console.log("edit item - do nothing for now.");
  }

  newCategory() {
    console.log("adding test item");
    let newItem = new WordsCategory("test", this.myData.length + 1,
      new Date(), LanguageEnum.English, LanguageEnum.Hebrew,
      new Map<string, string>([["Test", "בדיקה"]]));

    let newList = Array.from(this.myData);
    newList.push(newItem);
    this.myData = newList;
  }
}
