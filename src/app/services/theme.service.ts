import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  savedTheme = localStorage.getItem('theme');
  private themeSubject = new BehaviorSubject<string>(this.savedTheme || 'ferrari');
  theme = this.themeSubject.asObservable();

  constructor() { }

  setTheme(theme: string) {
    this.themeSubject.next(theme);
    localStorage.setItem('theme', theme);
  }
}
