import { Routes } from '@angular/router';
import { CategoriesTableComponent } from './categories-table/categories-table.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { GameChoiceComponent } from './game-choice/game-choice.component';
import { GameTranslateComponent } from './game-translate/game-translate.component';

export const routes: Routes = [
    { path: '', component: CategoriesTableComponent },
    { path: 'edit-category/:id', component: EditCategoryComponent },
    { path: 'newcategory', component: EditCategoryComponent },
    { path: 'gamechoice', component: GameChoiceComponent },
    { path: 'newgame/:id', component: GameTranslateComponent },
];
