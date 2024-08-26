import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogClose } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-exit-dialog',
  standalone: true,
  imports: [MatDialogClose, MatButtonModule],
  templateUrl: './exit-dialog.component.html',
  styleUrl: './exit-dialog.component.css',
})
export class ExitDialogComponent {
  constructor(private router: Router) {
  }

  navigateToMain() {
    this.router.navigate(['choose-game']);
  }
}
