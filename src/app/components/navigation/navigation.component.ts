import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { TEAMS } from '../../constants/constants';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  teams = TEAMS;
  theme: string;
  isDark: boolean;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.themeService.theme.subscribe(theme => this.theme = theme);
    this.themeService.isDark.subscribe(isDark => this.isDark = isDark);
  }

  saveTheme(theme: string) {
    this.themeService.setTheme(theme);
  }

  saveIsDark(isDark: boolean) {
    this.themeService.setIsDark(isDark);
  }
}
