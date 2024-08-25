import { Routes } from '@angular/router';
import { CategoriesTableComponent } from './categories-table/categories-table.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { GameChoiceComponent } from './game-choice/game-choice.component';
import { GameTranslateComponent } from './game-translate/game-translate.component';
import { HelpComponent } from './help/help.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { MessyWordsGameComponent } from './messy-words-game/messy-words-game.component';
import { SortWordsGameComponent } from './sort-words-game/sort-words-game.component';
import { ChooseGameComponent } from './choose-game/choose-game.component';
import { GameHelpComponent } from './game-help/game-help.component';


export const routes: Routes = [
    { path: 'admin', component: CategoriesTableComponent },
    { path: 'edit-category/:categoryId', component: EditCategoryComponent },
    { path: 'newcategory', component: EditCategoryComponent },
    { path: 'gamechoice', component: GameChoiceComponent },
    // { path: 'newgame/:id', component: GameTranslateComponent },
    { path: 'help', component: HelpComponent },
    { path: '', component: DasboardComponent},
    { path: 'messy-words-game/:categoryId', component: MessyWordsGameComponent},
    { path: 'sort-words-game/:categoryId', component: SortWordsGameComponent},
    { path: 'choose-game', component: ChooseGameComponent},
    { path: 'game-help', component: GameHelpComponent},
    { path: 'game-translate/:categoryId', component: GameTranslateComponent }
];
