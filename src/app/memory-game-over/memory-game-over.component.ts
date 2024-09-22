import { Component } from '@angular/core';
import { WordsCategory } from '../shared/model/words-category';
import { Router } from '@angular/router';
import { MemoryCard } from '../shared/model/memory-card';

export interface MemoryGameOverData {
  category: WordsCategory;
  tries: number;
  points: number;
  words: MemoryCard[];
}

@Component({
  selector: 'app-memory-game-over',
  standalone: true,
  imports: [],
  templateUrl: './memory-game-over.component.html',
  styleUrl: './memory-game-over.component.css',
})
export class MemoryGameOverComponent {
  dataFromGame: MemoryGameOverData;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.dataFromGame = navigation?.extras?.state?.[
      'data'
    ] as MemoryGameOverData;
  }
}
