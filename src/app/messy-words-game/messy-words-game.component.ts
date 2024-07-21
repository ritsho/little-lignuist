import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-messy-words-game',
  standalone: true,
  imports: []
  ,
  templateUrl: './messy-words-game.component.html',
  styleUrl: './messy-words-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessyWordsGameComponent { }
