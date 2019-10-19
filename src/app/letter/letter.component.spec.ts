import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterComponent } from './letter.component';
import { By } from '@angular/platform-browser';
import { GameService } from '../services/game.service';

describe('LetterComponent', () => {
  let component: LetterComponent;
  let fixture: ComponentFixture<LetterComponent>;
  let gameService: GameService;
  let gameSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LetterComponent ],
      providers: [ GameService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterComponent);
    component = fixture.componentInstance;
    gameService = fixture.debugElement.injector.get(GameService);
    gameSpy = spyOn(gameService, 'addGuess');
    component.letter = { chosen: false, letter: 'a' };
    fixture.detectChanges();
  });

  it('should be clickable', () => {
    let button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('should be disabled if it was already chosen', () => {
    component.letter.chosen = true;
    fixture.detectChanges();
    let button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should call the service when the button is clicked', () => {
    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);

    expect(gameSpy).toHaveBeenCalled();
  });
});
