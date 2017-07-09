import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { TopicDetailComponent } from './topic-detail.component';
import { TopicListComponent } from './topic-list.component';
import { TopicCreateComponent} from './topic-create.component';
import { ContestService } from './contest.service'
import { OptionService } from './option.service'
import { TopicService } from './topic.service'
import { RankingsService } from './rankings.service'
import { TopicOptionService } from './topicoption.service'
import { ApiService } from './api.service'
import { OptionListComponent } from './option-list.component'
import { OptionDetailComponent } from './option-detail.component'
import { OptionCreateComponent} from './option-create.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
    {
      path: 'topics/:id',
      component: TopicDetailComponent
    },
    {
      path: 'topics',
      component: TopicListComponent
    },
    {
      path: 'options',
      component: OptionListComponent
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
      TopicCreateComponent,
      OptionListComponent,
      OptionDetailComponent,
      OptionCreateComponent
  ],
  providers: [
      ContestService,
      OptionService,
      TopicService,
      TopicOptionService,
      RankingsService,
      ApiService
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule {
    constructor (private apiService: ApiService) {
        apiService.signIn("foo", "bar");
    }
}
