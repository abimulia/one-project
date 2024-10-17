import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { HighscoresComponent } from './highscores/highscores.component';

export const routes: Routes = [
    {
        path: 'home',
        title: 'Home Page',
        component: HomeComponent,
    },
    {
        path: 'game',
        title: 'Play Game',
        component: GameComponent,
    },
    {
        path: 'highscores',
        title: 'High Scores',
        component: HighscoresComponent,
    }
];
