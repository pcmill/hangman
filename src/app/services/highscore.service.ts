import { Injectable } from '@angular/core';
import { Highscore } from '../models/highscore.model';

@Injectable({
  providedIn: 'root'
})
export class HighscoreService {
  constructor() { }

  /**
   * Adds a score to the localstorage.
   * @param score Highscore
   */
  public addScore(score: Highscore) {
    if (localStorage.getItem('scores')) {
      let scoreArray: Array<Highscore> = JSON.parse(localStorage.getItem('scores'));
      scoreArray.push(score);
      localStorage.setItem('scores', JSON.stringify(scoreArray));
    } else {
      const newScore = [score];
      localStorage.setItem('scores', JSON.stringify(newScore));
    }
  }

  /**
   * Gets all the scores currently in the localstorage.
   */
  public getScores() {
    const score = JSON.parse(localStorage.getItem('scores'));

    if (score) {
      // We sort the scores on the score value where the highest score comes first
      return score.sort((a, b) => {
        return b.score - a.score;
      });
    } else {
      return [];
    }
  }
}
