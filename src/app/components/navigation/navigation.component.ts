import { Component } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  constructor(private themeService: ThemeService) { }

  saveTheme(theme: string) {
    this.themeService.setTheme(theme);
  }
}
