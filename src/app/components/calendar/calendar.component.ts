import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CalendarService } from '../../services/calendar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RaceDataSource } from '../../models/Race';
import { FIRST_SEASON, CURRENT_SEASON } from '../../constants/constants';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  seasons: number[] = [];
  selectedSeason = CURRENT_SEASON;
  firstSeason = FIRST_SEASON;
  currentSeason = CURRENT_SEASON;
  dataSource$: Observable<RaceDataSource[]>;
  displayedColumns: string[] = ['round', 'location', 'date', 'time'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private calendarService: CalendarService
  ) { }

  ngOnInit() {
    for (let i = this.firstSeason; i <= this.currentSeason + 1; i++) {
      this.seasons.push(i);
    }

    this.dataSource$ = this.route.paramMap.pipe(
      switchMap(params => {
        let season = Number(params.get('season'));
        if (
          season === 0
          || season < this.firstSeason
          || season > this.currentSeason + 1
          || Number.isNaN(season)
        ) {
          season = this.currentSeason;
          this.selectedSeason = season;
          this.router.navigate([`/calendar/${season}`]);
        }
        return this.calendarService.getCalendar(season);
      })
    );
  }

  onSelectSeason(e: MatSelectChange) {
    this.selectedSeason = Number(e.value);
    this.router.navigate([`/calendar/${this.selectedSeason}`]);
  }

  onChangeSeason(change: number) {
    this.selectedSeason += change;
    this.router.navigate([`/calendar/${this.selectedSeason}`]);
  }
}
