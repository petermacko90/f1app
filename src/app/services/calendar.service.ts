import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RaceData, Race } from '../models/Race';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  baseUrl = 'https://ergast.com/api/f1';
  calendars: { [k: string]: Race[] };

  constructor(private http: HttpClient) {}

  getCalendar(season: number): Observable<RaceData> {
    return this.http.get<RaceData>(`${this.baseUrl}/${season}.json`);
  }
}
