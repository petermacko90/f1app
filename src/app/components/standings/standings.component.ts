import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StandingsService } from '../../services/standings.service';
import { DriverStandingsDataSource } from '../../models/Standings';
import { FIRST_SEASON, CURRENT_SEASON } from '../../constants/constants';

@Component({
  selector: 'app-calendar',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {
  loading = false;
  error: string;
  selectedSeason = CURRENT_SEASON;
  firstSeason = FIRST_SEASON;
  currentSeason = CURRENT_SEASON;
  dataSource: DriverStandingsDataSource[];
  displayedColumns = ['position', 'driver', 'constructors', 'points', 'wins'];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private standingsService: StandingsService
  ) {}

  ngOnInit() {
    const season = Number(this.route.snapshot.paramMap.get('season'));
    if (
      season === 0
      || season < this.firstSeason
      || season > this.currentSeason + 1
      || Number.isNaN(season)
    ) {
      this.selectedSeason = this.currentSeason;
      this.location.replaceState(`/standings/${this.selectedSeason}`);
    } else {
      this.selectedSeason = season;
    }
    this.getDriverStandings(this.selectedSeason);
  }

  getDriverStandings(season: number) {
    this.error = '';
    this.loading = true;
    this.standingsService.getDriverStandings(season).subscribe(
      (data) => {
        this.dataSource = data;
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
    this.getDriverStandings(this.selectedSeason);
    this.location.replaceState(`/standings/${this.selectedSeason}`);
  }
}
