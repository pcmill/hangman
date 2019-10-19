import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighscoreComponent } from './highscore.component';
import { By } from '@angular/platform-browser';

describe('HighscoreComponent', () => {
  let component: HighscoreComponent;
  let fixture: ComponentFixture<HighscoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighscoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighscoreComponent);
    component = fixture.componentInstance;
    component.scores = [];
    fixture.detectChanges();
  });

  it('should show a message when there are no highscores', () => {
    const text = fixture.debugElement.query(By.css('.no-score'));

    expect(text).toBeTruthy();
    expect(text.nativeElement.textContent).toBe('Play the game and set your first highscore!');
  });

  it('should show the scores', () => {
    component.scores = [{ initials: 'PVM', score: 120, created: Date.now()}];
    fixture.detectChanges();

    const scores = fixture.debugElement.queryAll(By.css('.score-item'));
    expect(scores.length).toBe(1);
  });
});
