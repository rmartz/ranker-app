import { Component, Input } from '@angular/core';
import { Topic } from './topic'

@Component({
  selector: 'app-topic-detail',
  templateUrl: 'app/topic-detail.component.html'
})
export class TopicDetailComponent {
    @Input()
    topic: Topic;
}
