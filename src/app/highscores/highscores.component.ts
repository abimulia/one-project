import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Highscore } from '../highscore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-highscores',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet, RouterLinkActive],
  templateUrl: './highscores.component.html',
  styleUrls: ['../app.component.css','./highscores.component.css']
})
export class HighscoresComponent implements OnInit{
  highScores: Highscore[] = [];

  constructor(){}

  ngOnInit(): void {
    const storedHighScores = localStorage.getItem('highscores');
    if(storedHighScores){
      this.highScores = JSON.parse(storedHighScores);
    }
  }

}
