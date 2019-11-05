import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CalendarService } from '../../services/calendar.service';
import { ActivatedRoute } from '@angular/router';
import { RaceDataSource } from '../../models/Race';
import { FIRST_SEASON, CURRENT_SEASON, SEASONS } from '../../constants/constants';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  loading = false;
  error: string;
  seasons = SEASONS;
  selectedSeason = CURRENT_SEASON;
  firstSeason = FIRST_SEASON;
  currentSeason = CURRENT_SEASON;
  dataSource: RaceDataSource[];
  displayedColumns: string[] = ['round', 'location', 'date', 'time'];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private calendarService: CalendarService
  ) { }

  ngOnInit() {
    let season = Number(this.route.snapshot.paramMap.get('season'));
    if (
      season === 0
      || season < this.firstSeason
      || season > this.currentSeason + 1
      || Number.isNaN(season)
    ) {
      season = this.currentSeason;
      this.selectedSeason = season;
      this.location.replaceState(`/calendar/${this.selectedSeason}`);
    } else {
      this.selectedSeason = season;
    }
    this.getCalendar(season);
  }

  getCalendar(season: number) {
    this.error = '';
    this.loading = true;
    this.calendarService.getCalendar(season).subscribe(
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

  onSelectSeason(e: MatSelectChange) {
    this.selectedSeason = Number(e.value);
    this.getCalendar(this.selectedSeason);
    this.location.replaceState(`/calendar/${this.selectedSeason}`);
  }

  onChangeSeason(change: number) {
    this.selectedSeason += change;
    this.getCalendar(this.selectedSeason);
    this.location.replaceState(`/calendar/${this.selectedSeason}`);
  }
}
