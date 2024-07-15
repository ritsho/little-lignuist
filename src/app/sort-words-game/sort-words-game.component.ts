import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sort-words-game',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './sort-words-game.component.html',
  styleUrl: './sort-words-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortWordsGameComponent { }
