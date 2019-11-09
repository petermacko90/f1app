import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { FIRST_SEASON, CURRENT_SEASON, SEASONS } from '../../constants/constants';

@Component({
  selector: 'app-season-select',
  templateUrl: './season-select.component.html',
  styleUrls: ['./season-select.component.css']
})
export class SeasonSelectComponent {
  @Input() selectedSeason: number;
  @Output() changeSeason = new EventEmitter<number>();
  seasons = SEASONS;
  firstSeason = FIRST_SEASON;
  currentSeason = CURRENT_SEASON;

  onChangeSeason(change: number) {
    this.changeSeason.emit(this.selectedSeason += change);
  }

  onSelectSeason(e: MatSelectChange) {
    this.changeSeason.emit(Number(e.value));
  }
}
