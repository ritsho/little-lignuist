import { Component } from '@angular/core';
import { LIST_OF_CATEGORIES } from '../../main';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-categories-table',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatIconModule],
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.css'
})
export class CategoriesTableComponent {
  displayedColumns: string[] = ['name', 'zugot', 'last_change_date', 'actions'];
  dataSource = LIST_OF_CATEGORIES;
 
}
