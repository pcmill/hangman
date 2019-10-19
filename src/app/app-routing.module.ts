import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { HighscoreComponent } from './highscore/highscore.component';

const routes: Routes = [
  {
    path: 'game',
    component: GameComponent
  },
  {
    path: 'highscore',
    component: HighscoreComponent
  },
  {
    path: '**',
    redirectTo: '/game'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
