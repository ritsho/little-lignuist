import { Routes } from '@angular/router';
import { CategoriesTableComponent } from './categories-table/categories-table.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

export const routes: Routes = [
    { path: '', component: CategoriesTableComponent },
    { path: 'edit-category/:id', component: EditCategoryComponent },
    { path: 'newcategory', component: EditCategoryComponent },
];
