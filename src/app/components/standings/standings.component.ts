import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StandingsService } from '../../services/standings.service';
import { DriverStandingsDataSource, ConstructorStandingsDataSource } from '../../models/Standings';
import { FIRST_SEASON, CURRENT_SEASON } from '../../constants/constants';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {
  loading = false;
  error: string;
  firstSeason = FIRST_SEASON;
  currentSeason = CURRENT_SEASON;
  selectedSeason: number;
  driversDataSource: DriverStandingsDataSource[];
  constructorsDataSource: ConstructorStandingsDataSource[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private standingsService: StandingsService
  ) {}

  ngOnInit() {
    const season = Number(this.route.snapshot.paramMap.get('season'));
    if (
      season === 0
      || season < FIRST_SEASON
      || season > CURRENT_SEASON + 1
      || Number.isNaN(season)
    ) {
      this.selectedSeason = CURRENT_SEASON;
      this.location.replaceState(`/standings/${this.selectedSeason}`);
    } else {
      this.selectedSeason = season;
    }
    this.getStandings(this.selectedSeason);
  }

  getStandings(season: number) {
    this.error = '';
    this.loading = true;
    combineLatest([
      this.standingsService.getDriverStandings(season),
      this.standingsService.getConstructorStandings(season)
    ]).subscribe(
      ([drivers, constructors]) => {
        this.driversDataSource = drivers;
        this.constructorsDataSource = constructors;
        this.loading = false;
      },
      (error: Error) => {
        this.error = error.message;
        this.loading = false;
      }
    );
  }

  onSetSeason(season: number) {
    this.selectedSeason = season;
    this.getStandings(this.selectedSeason);
    this.location.replaceState(`/standings/${this.selectedSeason}`);
  }
}
