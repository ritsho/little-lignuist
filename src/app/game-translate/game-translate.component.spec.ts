import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTranslateComponent } from './game-translate.component';

describe('GameTranslateComponent', () => {
  let component: GameTranslateComponent;
  let fixture: ComponentFixture<GameTranslateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameTranslateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
