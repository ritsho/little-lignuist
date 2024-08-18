import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-exit-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './exit-button.component.html',
  styleUrl: './exit-button.component.css'
})
export class ExitButtonComponent {
  exitGame(){
    console.log("Exit Game");
  }
}
