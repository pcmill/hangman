import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import { Game } from '../models/game.model';

describe('GameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should initialize a game', async () => {
    const service: GameService = TestBed.get(GameService);
    let game: Game;

    service.getGame().subscribe((result) => {
      game = result;
    });

    service.initGame();

    expect(game.lost).toBeFalsy();
    expect(game.won).toBeFalsy();
    expect(game.currentScore).toEqual(0);
    expect(typeof game.created).toEqual('number');
    expect(typeof game.lettersToGuess).toEqual('object');
    expect(game.letters.length).toEqual(36);
  });

  it('should correctly reason about a guess', async () => {
    const service: GameService = TestBed.get(GameService);
    let game: Game;
    
    service.getGame().subscribe((result) => {
      game = result;
    });

    service.initGame();

    service.addGuess({letter: game.lettersToGuess[0], chosen: false});

    expect(game.won).toBeFalsy();
    expect(game.lost).toBeFalsy();
    expect(game.guessesLeft).toBe(5);
    expect(game.currentScore).toBe(0);
  });

  it('should correctly process a win', async () => {
    const service: GameService = TestBed.get(GameService);
    let game: Game;
    
    service.getGame().subscribe((result) => {
      game = result;
    });

    service.initGame();

    game.lettersToGuess.forEach((value) => {
      service.addGuess({letter: value, chosen: false});
    });

    expect(game.won).toBeTruthy();
    expect(game.lost).toBeFalsy();
    expect(game.guessesLeft).toBe(5);
    expect(game.currentScore).toBeGreaterThan(0);
  });

  it('should correctly process a loss', async () => {
    const service: GameService = TestBed.get(GameService);
    let game: Game;
    
    service.getGame().subscribe((result) => {
      game = result;
    });

    service.initGame();

    ['4', '5', '6', '7', '8'].forEach((value) => {
      service.addGuess({letter: value, chosen: false});
    });

    expect(game.won).toBeFalsy();
    expect(game.lost).toBeTruthy();
    expect(game.guessesLeft).toBe(0);
  });
});
