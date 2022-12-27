import { Component, Input } from '@angular/core';
import { ConstructorStandingsDataSource } from 'src/app/models/Standings';

@Component({
  selector: 'app-constructor-standings',
  templateUrl: './constructor-standings.component.html',
  styleUrls: ['./constructor-standings.component.css']
})
export class ConstructorrStandingsComponent {
  @Input() loading: boolean;
  @Input() error: string;
  @Input() dataSource: ConstructorStandingsDataSource[];

  displayedColumns = ['position', 'constructor', 'points', 'wins'];

  constructor() { }
}
