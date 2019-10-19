import { Component, Input } from '@angular/core';
import { Letter } from '../models/game.model';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss']
})
export class LetterComponent {
  @Input() letter: Letter;

  constructor(private gameService: GameService) { }

  choseLetter() {
    this.gameService.addGuess(this.letter);
  }
}
