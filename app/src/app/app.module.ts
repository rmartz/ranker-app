import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { TopicDetailComponent } from './topic-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
      AppComponent,
      TopicDetailComponent
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule { }
