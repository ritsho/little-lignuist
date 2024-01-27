import { Component } from '@angular/core';
import { LanguageEnum, WordsCategory } from '../../main';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ManageCategoriesService } from '../manage-categories.service';
import { TranslatedWord } from '../translated-word';

@Component({
  selector: 'app-categories-table',
  standalone: true,
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.css',
  imports: [MatTableModule, CommonModule, MatIconModule, MatButtonModule, HeaderComponent, FooterComponent]
})
export class CategoriesTableComponent {
  displayedColumns: string[] = ['name', 'words', 'last_change_date', 'actions'];
  myData = this.mc.getall();

  constructor(private mc: ManageCategoriesService) {

  }

  deleteItem(itemToRemove: WordsCategory) {
    this.mc.delete(itemToRemove.id);
    this.myData = this.mc.getall();
  }

  editItem() {
    console.log("edit item - do nothing for now.");
  }

  newCategory() {
    console.log("adding test item");
    let newItem = new WordsCategory("test", this.myData.length + 1,
      new Date(), LanguageEnum.English, LanguageEnum.Hebrew,
      [new TranslatedWord("Test", "בדיקה")]);

    this.mc.add(newItem);
    this.myData = this.mc.getall();
  }
}
