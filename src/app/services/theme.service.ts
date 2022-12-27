import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TEAMS } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<string>(this.getTheme());
  theme = this.themeSubject.asObservable();

  private isDarkSubject = new BehaviorSubject<boolean>(this.getIsDark());
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

  private getTheme(): string {
    return localStorage.getItem('theme') ?? TEAMS[1].id;
  }

  private getIsDark(): boolean {
    return localStorage.getItem('dark') === 'true' ? true : false;
  }
}
