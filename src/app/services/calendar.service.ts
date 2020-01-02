import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { RaceData, Race, RaceDataSource } from '../models/Race';
import { CURRENT_SEASON, BASE_URL } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private calendars: { [k: string]: Race[] };

  constructor(private http: HttpClient) {}

  getCalendar(season: number): Observable<RaceDataSource[]> {
    if (this.calendars && this.calendars[season]) {
      return of(this.getDataSource(this.calendars[season]));
    } else {
      return this.http.get<RaceData>(`${BASE_URL}/${season}.json`)
        .pipe(
          map(data => {
            if (data.MRData.RaceTable.Races.length === 0) {
              throw new Error('No data available');
            } else {
              this.calendars = {
                ...this.calendars,
                ...{ [season]: data.MRData.RaceTable.Races }
              };
              return this.getDataSource(data.MRData.RaceTable.Races);
            }
          }),
          catchError(error => {
            throw new Error(error);
          })
        );
    }
  }

  private getDate(date: string, time?: string) {
    return time ? new Date(`${date}T${time}`) : new Date(date);
  }

  private getUpcomingRace(races: Race[]) {
    for (let i = 0, l = races.length, d = new Date(); i < l; i++) {
      if (d < this.getDate(races[i].date, races[i].time)) {
        return races[i].round;
      }
    }
    return '';
  }

  private getDataSource(calendar: Race[]): RaceDataSource[] {
    const upcomingRace = (Number(calendar[0].season) === CURRENT_SEASON) ? this.getUpcomingRace(calendar) : '';

    return calendar.map(race => ({
      round: race.round,
      location: `${race.Circuit.Location.country}, ${race.Circuit.Location.locality}`,
      date: this.getDate(race.date, race.time).toLocaleDateString(),
      time: race.time ? this.getDate(race.date, race.time).toLocaleTimeString() : 'N/A',
      isUpcoming: upcomingRace === race.round
    }));
  }
}
