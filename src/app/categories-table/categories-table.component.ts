import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ManageCategoriesService } from '../shared/services/manage-categories.service';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { WordsCategory } from '../shared/model/words-category';
import { LanguageEnum } from '../shared/model/language-enum';

@Component({
  selector: 'app-categories-table',
  standalone: true,
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.css',
  imports: [
    MatTableModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    HeaderComponent,
    FooterComponent,
    RouterLink,
    MatSortModule,
  ],
})
export class CategoriesTableComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['name', 'words', 'lastChangeDate', 'actions'];
  myData = new MatTableDataSource<WordsCategory>();
  isLoading: boolean = false;

  constructor(
    private mc: ManageCategoriesService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.sort = new MatSort();
  }

  async ngOnInit(): Promise<void> {
    await this.refreshData();
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.myData.sort = this.sort;
  }

  async deleteItem(itemToRemove: WordsCategory): Promise<void> {
    const deleteDialog = this.dialog.open(DeleteDialogComponent, {
      data: { categoryName: itemToRemove.name },
    });

    deleteDialog.afterClosed().subscribe(async (result) => {
      try {
        if (result == true) {
          await this.mc.delete(itemToRemove.id);
          this.refreshData();
        }
      } catch (error) {
        console.log(`error while deleting: ${error}`);
      }
    });
  }

  editItem(itemToEdit: WordsCategory): void {
    this.router.navigate(['edit-category/' + itemToEdit.id]);
  }

  async newCategory(): Promise<void> {
    const newItem = new WordsCategory(
      'test',
      (this.myData.data.length + 1).toString(),
      LanguageEnum.English,
      LanguageEnum.Hebrew,
      []
    );

    await this.mc.add(newItem);
    await this.refreshData();
  }

  async refreshData() {
    try {
      this.isLoading = true;
      console.log('refreshing data...');

      this.mc.list().then((res) => {
        this.myData = new MatTableDataSource(res);
        this.isLoading = false;
      });
    } catch (error) {
      console.log(`error while refreshing data: ${error}`);
    }
  }
}
