import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Race, RaceDataSource } from '../../models/Race';
import { FIRST_SEASON, CURRENT_SEASON } from '../../constants/constants';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendars: { [k: string]: Race[] };
  loading = false;
  error = '';
  seasons: number[] = [];
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

    if (season === 0) {
      season = this.currentSeason;
      this.router.navigate([`/calendar/${season}`]);
    }

    if (!(season >= this.firstSeason && season <= this.currentSeason + 1)) {
      this.error = 'Invalid season';
    } else {
      this.selectedSeason = season;
      this.getCalendar(season);
    }

    for (let i = this.firstSeason; i <= this.currentSeason + 1; i++) {
      this.seasons.push(i);
    }
  }

  getDate(date: string, time?: string) {
    return time ? new Date(`${date}T${time}`) : new Date(date);
  }

  getUpcomingRace(races: Race[], season: number, currentSeason: number) {
    if (season === currentSeason) {
      for (let i = 0, l = races.length, d = new Date(); i < l; i++) {
        if (d < this.getDate(races[i].date, races[i].time)) {
          return races[i].round;
        }
      }
    }
    return '';
  }

  getDataSource(calendar: Race[]): RaceDataSource[] {
    const upcomingRace = this.getUpcomingRace(calendar, Number(calendar[0].season), this.currentSeason);

    return calendar.map(race => ({
      round: race.round,
      location: `${race.Circuit.Location.country}, ${race.Circuit.Location.locality}`,
      date: this.getDate(race.date, race.time).toLocaleDateString(),
      time: race.time ? this.getDate(race.date, race.time).toLocaleTimeString() : 'N/A',
      isUpcoming: upcomingRace === race.round
    }));
  }

  getCalendar(season: number) {
    if (this.calendars && this.calendars[season]) {
      this.dataSource = this.getDataSource(this.calendars[season]);
    } else {
      this.error = '';
      this.loading = true;
      this.calendarService.getCalendar(season).subscribe(
        data => {
          if (data.MRData.RaceTable.Races.length === 0) {
            this.error = 'No data available';
          } else {
            this.calendars = {
              ...this.calendars,
              ...{ [season]: data.MRData.RaceTable.Races }
            };
            this.dataSource = this.getDataSource(data.MRData.RaceTable.Races);
          }
          this.loading = false;
        },
        (error: string) => {
          this.error = error;
          this.loading = false;
        }
      );
    }
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
