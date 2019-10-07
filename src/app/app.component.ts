import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'F1 App';
  theme: string;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.theme.subscribe(theme => this.theme = theme);
  }
}