import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ExitDialogComponent } from '../exit-dialog/exit-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exit-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, ExitDialogComponent],
  templateUrl: './exit-button.component.html',
  styleUrl: './exit-button.component.css',
})
export class ExitButtonComponent {
  constructor(private router: Router, private dialog: MatDialog) {}

  exitGame() {
    const exitDialog = this.dialog.open(ExitDialogComponent, {
      data: {},
    });

    exitDialog.afterClosed().subscribe((result) => {
      console.log(`exit dialog result: ${result}`);
    });

    console.log('Exit Game');
  }
}
