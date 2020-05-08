import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  DriverStandings,
  DriverStandingsData,
  DriverStandingsDataSource,
  ConstructorStandings,
  ConstructorStandingsData,
  ConstructorStandingsDataSource
} from '../models/Standings';
import { BASE_URL } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {
  private driverStandings: { [k: string]: DriverStandings[] };
  private constructorStandings: { [k: string]: ConstructorStandings[] };

  constructor(private http: HttpClient) {}

  getDriverStandings(season: number): Observable<DriverStandingsDataSource[]> {
    if (this.driverStandings && this.driverStandings[season]) {
      return of(this.getDriversDataSource(this.driverStandings[season]));
    } else {
      return this.http.get<DriverStandingsData>(`${BASE_URL}/${season}/driverStandings.json`)
        .pipe(
          map(data => {
            const standings = data.MRData.StandingsTable.StandingsLists;
            if (standings.length === 0) {
              throw new Error('No data available');
            } else {
              this.driverStandings = {
                ...this.driverStandings,
                ...{ [season]: standings[0].DriverStandings }
              };
              return this.getDriversDataSource(standings[0].DriverStandings);
            }
          }),
          catchError(error => {
            throw new Error(error);
          })
        );
    }
  }

  getConstructorStandings(season: number): Observable<ConstructorStandingsDataSource[]> {
    if (this.constructorStandings && this.constructorStandings[season]) {
      return of(this.getConstructorsDataSource(this.constructorStandings[season]));
    } else {
      return this.http.get<ConstructorStandingsData>(`${BASE_URL}/${season}/constructorstandings.json`)
        .pipe(
          map(data => {
            const standings = data.MRData.StandingsTable.StandingsLists;
            if (standings.length === 0) {
              throw new Error('No data available');
            } else {
              this.constructorStandings = {
                ...this.constructorStandings,
                ...{ [season]: standings[0].ConstructorStandings }
              };
              return this.getConstructorsDataSource(standings[0].ConstructorStandings);
            }
          }),
          catchError(error => {
            throw new Error(error);
          })
        );
    }
  }

  private getDriversDataSource(standings: DriverStandings[]): DriverStandingsDataSource[] {
    return standings.map(s => ({
      position: `${s.position}.`,
      driver: `${s.Driver.givenName} ${s.Driver.familyName}`,
      constructors: s.Constructors.map(c => c.name).join(', '),
      points: s.points,
      wins: s.wins
    }));
  }

  private getConstructorsDataSource(standings: ConstructorStandings[]): ConstructorStandingsDataSource[] {
    return standings.map(s => ({
      position: `${s.position}.`,
      constructor: s.Constructor.name,
      points: s.points,
      wins: s.wins
    }));
  }
}
