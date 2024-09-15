import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dasboard',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './dasboard.component.html',
  styleUrl: './dasboard.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DasboardComponent { }
