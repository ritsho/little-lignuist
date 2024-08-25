import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSucceedComponent } from './player-succeed.component';

describe('PlayerSucceedComponent', () => {
  let component: PlayerSucceedComponent;
  let fixture: ComponentFixture<PlayerSucceedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerSucceedComponent]
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
