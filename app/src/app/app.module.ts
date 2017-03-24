import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { TopicDetailComponent } from './topic-detail.component';
import { TopicsComponent } from './topics.component';
import { TopicService } from './topic.service'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'topics',
        component: TopicsComponent
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
      TopicsComponent,
      TopicDetailComponent
  ],
  providers: [
      TopicService
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule { }
