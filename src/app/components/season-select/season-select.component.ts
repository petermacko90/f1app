import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-season-select',
  templateUrl: './season-select.component.html',
  styleUrls: ['./season-select.component.css']
})
export class SeasonSelectComponent implements OnInit {
  @Input() selectedSeason: number;
  @Input() seasonRange: [number, number];
  @Output() changeSeason = new EventEmitter<number>();
  seasons: number[] = [];

  ngOnInit() {
    for (let i = this.seasonRange[0]; i <= this.seasonRange[1]; i++) {
      this.seasons.push(i);
    }
  }

  onChangeSeason(change: number) {
    this.changeSeason.emit(this.selectedSeason + change);
  }

  onSelectSeason(e: MatSelectChange) {
    this.changeSeason.emit(Number(e.value));
  }
}
