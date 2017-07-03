import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { TopicDetailComponent } from './topic-detail.component';
import { TopicListComponent } from './topic-list.component';
import { TopicService } from './topic.service'
import { ApiService } from './api.service'
import { OptionDetailComponent } from './option-detail.component'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
    {
      path: 'topics',
      component: TopicListComponent
    },
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: '',
      redirectTo: '/dashboard',
      pathMatch: 'full'
    },
    ])
  ],
  declarations: [
      AppComponent,
      DashboardComponent,
      TopicListComponent,
      TopicDetailComponent,
      OptionDetailComponent
  ],
  providers: [
      TopicService,
      ApiService
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule { }
