import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  seasons = SEASONS;
  selectedSeason = CURRENT_SEASON;
  firstSeason = FIRST_SEASON;
  currentSeason = CURRENT_SEASON;
  dataSource: RaceDataSource[];
  displayedColumns: string[] = ['round', 'location', 'date', 'time'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
    } else {
      this.selectedSeason = season;
    }
    this.getCalendar(season);
  }

  getCalendar(season: number) {
    this.loading = true;
    this.calendarService.getCalendar(season).subscribe(
      (data) => {
        this.dataSource = data;
        this.loading = false;
      }
    );
  }

  onSelectSeason(e: MatSelectChange) {
    this.selectedSeason = Number(e.value);
    this.router.navigate([`/calendar/${this.selectedSeason}`]);
    this.getCalendar(this.selectedSeason);
  }

  onChangeSeason(change: number) {
    this.selectedSeason += change;
    this.router.navigate([`/calendar/${this.selectedSeason}`]);
    this.getCalendar(this.selectedSeason);
  }
}
