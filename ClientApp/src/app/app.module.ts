import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {ChartModule } from '@syncfusion/ej2-angular-charts';
import { CategoryService, LegendService, TooltipService } from '@syncfusion/ej2-angular-charts';
import { DataLabelService, LineSeriesService} from '@syncfusion/ej2-angular-charts';
import {ChartComponent} from '@syncfusion/ej2-angular-charts';
import{ScatterSeriesService} from '@syncfusion/ej2-angular-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import {MoviesComponent} from './movies/movies.component';
import {CreateComponent} from './movies/create/create.component';
import {EditComponent} from './movies/edit/edit.component';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    MoviesComponent,
    CreateComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ChartModule,
    FormsModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAcwt0CRSH-JXVIyGQNt6pI8-YaXZ6P73g'
    }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'movies', component: MoviesComponent },
      { path: 'movies/create', component: CreateComponent },
      { path: 'movies/edit/:id', component: EditComponent },
    ])
  ],
  providers: [ CategoryService, LegendService, TooltipService, DataLabelService, LineSeriesService,ScatterSeriesService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
