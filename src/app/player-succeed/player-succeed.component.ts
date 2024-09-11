import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export interface PlayerSucceedData {
  isWin: boolean;
}

@Component({
  selector: 'app-player-succeed',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, MatDialogClose],
  templateUrl: './player-succeed.component.html',
  styleUrl: './player-succeed.component.css',
})
export class PlayerSucceedComponent {
  isWin: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: PlayerSucceedData) {
    this.isWin = data.isWin;
  }

  onClick() {}
}
