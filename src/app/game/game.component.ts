import { Component, OnInit, OnDestroy } from '@angular/core';
import { Game } from '../models/game.model';
import { Subscription } from 'rxjs';
import { GameService } from '../services/game.service';
import { HighscoreService } from '../services/highscore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  public game: Game;
  private gameSub: Subscription;
  public initials: string;

  constructor(
    private gameService: GameService,
    private highscoreService: HighscoreService,
    private router: Router
  ) { }

  ngOnInit() {
    this.gameSub = this.gameService.getGame().subscribe((game) => {
      this.game = game;
    });

    this.gameService.initGame();
  }

  ngOnDestroy() {
    this.gameSub.unsubscribe();
  }

  newGame() {
    this.gameService.initGame();
  }

  setScore() {
    this.highscoreService.addScore({
      score: this.game.currentScore,
      initials: this.initials,
      created: Date.now()
    });

    this.router.navigate(['highscore']);
  }

  revealLetter(position) {
    // Find position in letters array
    if (this.game.letters) {
      const letter = this.game.letters.filter((letter) => letter.letter === position);
    
      if (letter && letter[0]) {
        return letter[0].chosen;
      }
    }
  }
}
