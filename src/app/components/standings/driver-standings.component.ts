import { Component, Input } from '@angular/core';
import { DriverStandingsDataSource } from 'src/app/models/Standings';

@Component({
  selector: 'app-driver-standings',
  templateUrl: './driver-standings.component.html',
  styleUrls: ['./driver-standings.component.css']
})
export class DriverStandingsComponent {
  @Input() loading: boolean;
  @Input() error: string;
  @Input() dataSource: DriverStandingsDataSource[];

  displayedColumns = ['position', 'driver', 'constructors', 'points', 'wins'];

  constructor() {}
}
