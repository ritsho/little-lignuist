import { ChooseCategoryDialogComponent } from './../choose-category-dialog/choose-category-dialog.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GameInfoService } from '../shared/services/game-info.service';
import { GameProfile } from '../shared/model/GameProfile';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-choose-game',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './choose-game.component.html',
  styleUrl: './choose-game.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ChooseGameComponent implements OnInit {
  public games: GameProfile[] = [];

  constructor(private gis: GameInfoService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.games = this.gis.getGames();
  }

  choosegame(gp: GameProfile) {
    this.dialog.open(ChooseCategoryDialogComponent, {
      data: gp,
    });
  }
}
