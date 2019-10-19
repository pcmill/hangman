import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { LetterComponent } from '../letter/letter.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { By } from '@angular/platform-browser';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let gameService: GameService;
  let initGameSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule],
      declarations: [ GameComponent, LetterComponent ],
      providers: [ 
        { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); }}, 
        GameService 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    gameService = fixture.debugElement.injector.get(GameService);
    initGameSpy = spyOn(gameService, 'initGame').and.callThrough();
    fixture.detectChanges();
  });

  it('should show an initialized game', async () => {
    expect(component).toBeTruthy();
    expect(component.game).toBeDefined();
    expect(initGameSpy).toHaveBeenCalled();
  });

  it('should show a message when the game is lost', () => {
    component.game.lost = true;
    fixture.detectChanges();

    const resultTitle = fixture.debugElement.query(By.css('.result > h2'));

    expect(resultTitle.nativeElement.textContent).toEqual('You have lost...');
  });

  it('should show a message when the game is won', () => {
    component.game.won = true;
    fixture.detectChanges();

    const resultTitle = fixture.debugElement.query(By.css('.result > h2'));

    expect(resultTitle.nativeElement.textContent).toEqual('You have won with a score of 0!');
  });

  it('should allow the user to start a new game', () => {
    fixture.debugElement.query(By.css('.new-game')).triggerEventHandler('click', null);
    expect(initGameSpy).toHaveBeenCalled();
  });

  it('should show the right amount of guesses', () => {
    const guessesLeft = fixture.debugElement.query(By.css('.guesses-left > p'));
    expect(guessesLeft.nativeElement.textContent).toEqual('5 wrong guesses left');
  });

  it('should hide the letters when they are not guessed yet', () => {
    const letter = fixture.debugElement.query(By.css('.letter > span'));
    expect(letter.nativeElement.textContent).toEqual('_');
  });

  it('should show the letters when they are guessed', () => {
    const firstLetter = component.game.lettersToGuess[0];

    const letterIndex = component.game.letters.findIndex((letter) => {
      return letter.letter === firstLetter;
    });

    component.game.letters[letterIndex].chosen = true;

    fixture.detectChanges();

    const letter = fixture.debugElement.query(By.css('.letter > span'));
    expect(letter.nativeElement.textContent).toEqual(firstLetter);
  });
});
