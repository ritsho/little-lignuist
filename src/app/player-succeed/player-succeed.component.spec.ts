import { MatDialog } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSucceedComponent } from './player-succeed.component';

describe('PlayerSucceedComponent', () => {
  let component: PlayerSucceedComponent;
  let fixture: ComponentFixture<PlayerSucceedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerSucceedComponent,MatDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerSucceedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
