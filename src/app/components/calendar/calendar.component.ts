import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CalendarService } from '../../services/calendar.service';
import { ActivatedRoute } from '@angular/router';
import { RaceDataSource } from '../../models/Race';
import { FIRST_SEASON, CURRENT_SEASON } from '../../constants/constants';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  loading = false;
  error: string;
  selectedSeason = CURRENT_SEASON;
  dataSource: RaceDataSource[];
  displayedColumns = ['round', 'location', 'date', 'time'];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private calendarService: CalendarService
  ) { }

  ngOnInit() {
    const season = Number(this.route.snapshot.paramMap.get('season'));
    if (
      season === 0
      || season < FIRST_SEASON
      || season > CURRENT_SEASON + 1
      || Number.isNaN(season)
    ) {
      this.selectedSeason = CURRENT_SEASON;
      this.location.replaceState(`/calendar/${this.selectedSeason}`);
    } else {
      this.selectedSeason = season;
    }
    this.getCalendar(this.selectedSeason);
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

  onSetSeason(season: number) {
    this.selectedSeason = season;
    this.getCalendar(this.selectedSeason);
    this.location.replaceState(`/calendar/${this.selectedSeason}`);
  }
}
