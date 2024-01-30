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
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-categories-table',
  standalone: true,
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.css',
  imports: [MatTableModule, CommonModule, MatIconModule, MatButtonModule, HeaderComponent, FooterComponent, RouterLink]
})
export class CategoriesTableComponent {
  displayedColumns: string[] = ['name', 'words', 'last_change_date', 'actions'];
  myData = this.mc.getall();

  constructor(private mc: ManageCategoriesService, private router: Router, private dialog: MatDialog) {

  }

  deleteItem(itemToRemove: WordsCategory): void {
    const deleteDialog = this.dialog.open(DeleteDialogComponent, {
      data: { categoryName: itemToRemove.name },
    });

    deleteDialog.afterClosed().subscribe(result => {
      if (result == true) {
        // DELETE
        this.mc.delete(itemToRemove.id);

        // Refresh the table (UI)
        this.myData = this.mc.getall();
      }
    });
  }

  editItem(itemToEdit: WordsCategory): void {
    this.router.navigate(['edit-category/' + itemToEdit.id]);
  }

  newCategory(): void {
    console.log("adding test item");
    let newItem = new WordsCategory("test", this.myData.length + 1,
      new Date(), LanguageEnum.English, LanguageEnum.Hebrew,
      [new TranslatedWord("Test", "בדיקה")]);

    this.mc.add(newItem);
    this.myData = this.mc.getall();
  }
}
