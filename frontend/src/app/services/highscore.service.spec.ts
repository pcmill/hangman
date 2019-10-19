import { TestBed } from '@angular/core/testing';

import { HighscoreService } from './highscore.service';

describe('HighscoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should return an empty array when there are no scores', () => {
    const service: HighscoreService = TestBed.get(HighscoreService);
    expect(service.getScores()).toEqual([]);
  });

  it('should return the scores array from localstorage', () => {
    const service: HighscoreService = TestBed.get(HighscoreService);
    const now = Date.now()
    localStorage.setItem('scores', JSON.stringify([{ initials: 'PVM', score: 120, created: now}]));
    expect(service.getScores()).toEqual([{ initials: 'PVM', score: 120, created: now}]);
  });

  it('should return a sorted array', () => {
    const service: HighscoreService = TestBed.get(HighscoreService);
    localStorage.setItem('scores', JSON.stringify([{ initials: 'PVM', score: 120, created: Date.now()}, { initials: 'PVM', score: 240, created: Date.now()}]));
    const scores = service.getScores();
    expect(scores[0].score).toEqual(240);
  });

  it('should set a score in the localstorage', () => {
    const service: HighscoreService = TestBed.get(HighscoreService);
    const now = Date.now();
    
    service.addScore({initials: 'PVM', score: 1340, created: now});
    
    const scores = JSON.parse(localStorage.getItem('scores'));
    expect(scores).toEqual([{initials: 'PVM', score: 1340, created: now}]);
  });
});
