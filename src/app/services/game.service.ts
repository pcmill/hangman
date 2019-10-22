import { Injectable } from '@angular/core';
import { Game, Letter } from '../models/game.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private GUESS_AMOUNT = 5;
  private START_SCORE = 300000; // 5 minutes in milliseconds
  private game = new BehaviorSubject<Game | undefined>(undefined);

  constructor() { }

  /**
   * Initializes the game with a word to guess.
   */
  public initGame() {
    const game: Game = {
      created: Date.now(),
      guessesLeft: this.GUESS_AMOUNT,
      currentScore: 0,
      lettersToGuess: this.getNewWord(),
      letters: this.getLetters(),
      won: false,
      lost: false
    };
    
    this.game.next(game);
  }

  /**
   * Get the current game data as an observable to subscribe to.
   */
  public getGame(): Observable<Game | undefined> {
    return this.game.asObservable();
  }

  /**
   * This function will process a guess and move the game along.
   * @param letter Letter
   */
  public addGuess(letter: Letter) {
    let game = this.game.getValue();

    // Set the chosen letter to true to disable the button.
    const index = game.letters.findIndex((found) => {
      return found.letter === letter.letter;
    });

    game.letters[index].chosen = true;

    // Check if the user found a correct letter
    let foundCorrect = game.lettersToGuess.some((correctLetter) => {
      return correctLetter === letter.letter;
    });

    if (!foundCorrect) {
      game.guessesLeft = game.guessesLeft - 1;
    }

    game = this.isEndOfGame(game);

    this.game.next(game);
  }

  /**
   * Checks if the game is finished and if the player won or lost.
   * @param game Game
   */
  private isEndOfGame(game: Game) {
    const won = game.lettersToGuess.reduce((accumulator, letter) => {
      const foundLetter = game.letters.find((position) => {
        return position.letter === letter;
      });

      return accumulator && foundLetter.chosen;
    }, true);

    // Determine if the game is won or lost
    if (game.guessesLeft === 0 && !won) {
      game.lost = true;
    } else if (won) {
      game.currentScore = this.calculateScore(game.created);
      game.won = true;
    }

    return game;
  }

  /**
   * Calculates the score if the player won.
   * The quicker you guess the right word the higher the score will be.
   * @param timeStarted number
   */
  private calculateScore(timeStarted: number) {
    const elapsedTime = Date.now() - timeStarted;
    return this.START_SCORE - elapsedTime;
  }

  /**
   * Creates an array of letters which the player can click on.
   */
  private getLetters(): Array<Letter> {
    const letters = Array.from('abcdefghijklmnopqrstuvwxyz0123456789').map((letter) => {
      return {
        chosen: false,
        letter: letter
      }
    });

    return letters;
  }

  /**
   * Returns a new word to guess.
   */
  private getNewWord(): Array<string> {
    const words = ['3dhubs', 'marvin', 'print', 'filament', 'order', 'layer'];
    const randomWord = words[Math.floor(Math.random() * words.length)];

    return Array.from(randomWord);
  }
}
