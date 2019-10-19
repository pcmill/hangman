import { Component, OnInit } from '@angular/core';
import { Highscore } from '../models/highscore.model';
import { HighscoreService } from '../services/highscore.service';

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.scss']
})
export class HighscoreComponent implements OnInit {
  public scores: Highscore[];

  constructor(private highscoreService: HighscoreService) { }

  ngOnInit() {
    this.scores = this.highscoreService.getScores();
  }
}
