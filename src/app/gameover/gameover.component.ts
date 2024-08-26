import { TranslatedWord } from '../shared/model/translated-word';
import { WordsCategory } from './../shared/model/words-category';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-gameover',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './gameover.component.html',
  styleUrl: './gameover.component.css'
})

export class GameoverComponent {
  displayedColumns: string[] = ['hebrew', 'english', 'icon'];
  // dataSource = WORD_DATA;

  getIcon(success: boolean): string {
    return success ? 'check_circle' : 'cancel';
  }
}

