import { Component, Input } from '@angular/core';
import { Topic } from './topic'

@Component({
  selector: 'app-topic-detail',
  template: `
  <div *ngIf="topic">
    <h2>{{topic.label}} details!</h2>
    <div><label>id: </label>{{topic.id}}</div>
    <div>
      <label>label: </label>
      <input [(ngModel)]="topic.label" placeholder="label"/>
    </div>
  </div>
`
})
export class TopicDetailComponent {
    @Input()
    topic: Topic;
}
