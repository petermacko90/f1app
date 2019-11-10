import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  DriverStandings,
  DriverStandingsData,
  DriverStandingsDataSource
} from '../models/Standings';
import { BASE_URL } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {
  private driverStandings: { [K: string]: DriverStandings[] };

  constructor(private http: HttpClient) {}

  getDriverStandings(season: number): Observable<DriverStandingsDataSource[]> {
    if (this.driverStandings && this.driverStandings[season]) {
      return of(this.getDriversDataSource(this.driverStandings[season]));
    } else {
      return this.http.get<DriverStandingsData>(`${BASE_URL}/${season}/driverStandings.json`)
        .pipe(
          map(data => {
            if (data.MRData.StandingsTable.StandingsLists.length === 0) {
              throw new Error('No data available');
            } else {
              this.driverStandings = {
                ...this.driverStandings,
                ...{ [season]: data.MRData.StandingsTable.StandingsLists[0].DriverStandings }
              };
              return this.getDriversDataSource(data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
            }
          }),
          catchError(error => {
            throw new Error(error);
          })
        );
    }
  }

  private getDriversDataSource(standings: DriverStandings[]): DriverStandingsDataSource[] {
    return standings.map(s => {
      let constructors = '';
      for (let i = 0, l = s.Constructors.length; i < l; i++) {
        constructors += s.Constructors[i].name;
        if (i + 1 !== l) {
          constructors += ', ';
        }
      }

      return {
        position: `${s.position}.`,
        driver: `${s.Driver.givenName} ${s.Driver.familyName}`,
        constructors: constructors,
        points: s.points,
        wins: s.wins
      };
    });
  }
}
