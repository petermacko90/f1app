import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  savedTheme = localStorage.getItem('theme');
  private themeSubject = new BehaviorSubject<string>(this.savedTheme || 'ferrari');
  theme = this.themeSubject.asObservable();
  savedIsDark = localStorage.getItem('dark') === 'true' ? true : false;
  private isDarkSubject = new BehaviorSubject<boolean>(this.savedIsDark || false);
  isDark = this.isDarkSubject.asObservable();

  constructor() { }

  setTheme(theme: string) {
    this.themeSubject.next(theme);
    localStorage.setItem('theme', theme);
  }

  setIsDark(isDark: boolean) {
    this.isDarkSubject.next(isDark);
    localStorage.setItem('dark', String(isDark));
  }
}
