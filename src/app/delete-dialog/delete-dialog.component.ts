import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

export interface DeleteDialogData {
  categoryName: string;
}

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DeleteDialogData) {
  }
}
