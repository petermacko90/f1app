import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<string>('ferrari');
  theme = this.themeSubject.asObservable();

  constructor() { }

  setTheme(theme: string) {
    this.themeSubject.next(theme);
  }
}
