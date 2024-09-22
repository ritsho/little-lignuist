import { MessyGameOverComponent } from './messy-game-over/messy-game-over.component';
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
import { SortGameOverComponent } from './sort-game-over/sort-game-over.component';
import { MemoryGameComponent } from './memory-game/memory-game.component';
import { MemoryGameOverComponent } from './memory-game-over/memory-game-over.component';

export const routes: Routes = [
  { path: 'admin', component: CategoriesTableComponent },
  { path: 'edit-category/:categoryId', component: EditCategoryComponent },
  { path: 'newcategory', component: EditCategoryComponent },
  { path: 'gamechoice', component: GameChoiceComponent },
  { path: 'help', component: HelpComponent },
  { path: '', component: DasboardComponent },

  { path: 'messy-words-game/:categoryId', component: MessyWordsGameComponent },
  { path: 'sort-words-game/:categoryId', component: SortWordsGameComponent },
  { path: 'game-translate/:categoryId', component: GameTranslateComponent },
  { path: 'memory-game/:categoryId', component: MemoryGameComponent },

  { path: 'choose-game', component: ChooseGameComponent },
  { path: 'game-help', component: GameHelpComponent },

  { path: 'messy-game-over', component: MessyGameOverComponent },
  { path: 'sort-game-over', component: SortGameOverComponent },
  { path: 'memory-game-over', component: MemoryGameOverComponent },
];
