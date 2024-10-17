import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'one-project';

  constructor(private router: Router) {}

  ngOnInit(): void {
      setTimeout(() => {
        this.router.navigateByUrl("/home");
      }, 100);
  }
}
