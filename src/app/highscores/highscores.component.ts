import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-highscores',
  standalone: true,
  imports: [RouterLink,RouterOutlet, RouterLinkActive],
  templateUrl: './highscores.component.html',
  styleUrls: ['../app.component.css','./highscores.component.css']
})
export class HighscoresComponent {

}
