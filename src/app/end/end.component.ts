import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Highscore } from '../highscore';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-end',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink,RouterOutlet, RouterLinkActive],
  templateUrl: './end.component.html',
  styleUrls: ['../app.component.css','./end.component.css']
})
export class EndComponent implements OnInit{
  @Input() gamername!: string;
  mostRecentScore = '';
  submitInvalid=false;

  constructor(){
    
  }

  ngOnInit(): void {
    this.mostRecentScore = sessionStorage.getItem('mostRecentScore')+'';
  }

  saveScore(event: any){
    this.submitInvalid=true;
    const savedHighscores = localStorage.getItem('highscores');
    const currHighScores: any[] = (savedHighscores ? JSON.parse(savedHighscores):[]);
    const currHighScore: Highscore = {
      name: this.gamername,
      score: Number(this.mostRecentScore)
    };
    currHighScores.push(currHighScore);

    currHighScores.sort((a,b) => b.score - a.score);
    currHighScores.splice(10);
    localStorage.setItem('highscores', JSON.stringify(currHighScores));


  }

}
