import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { StandingsComponent } from './components/standings/standings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: 'calendar/:season', component: CalendarComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'standings/:season', component: StandingsComponent },
  { path: 'standings', component: StandingsComponent },
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
