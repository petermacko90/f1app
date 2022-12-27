import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { combineLatest } from 'rxjs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { StandingsComponent } from './components/standings/standings.component';
import { SeasonSelectComponent } from './components/season-select/season-select.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ThemeService } from './services/theme.service';
import { DriverStandingsComponent } from './components/standings/driver-standings.component';
import { ConstructorrStandingsComponent } from './components/standings/constructor-standings.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    StandingsComponent,
    DriverStandingsComponent,
    ConstructorrStandingsComponent,
    SeasonSelectComponent,
    NavigationComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private themeService: ThemeService,
    overlayContainer: OverlayContainer
  ) {
    combineLatest([this.themeService.theme, this.themeService.isDark])
      .subscribe(([theme, isDark]) => {
        overlayContainer.getContainerElement().className =
          `cdk-overlay-container ${theme}${isDark ? ' dark' : ''}`;
      });
  }
}
