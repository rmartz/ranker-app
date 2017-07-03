import { Component, OnInit, Input } from '@angular/core';

import { TopicService } from './topic.service'
import { Topic } from './topic'
import { Option } from './option'

@Component({
  selector: 'app-topic-detail',
  templateUrl: 'app/topic-detail.component.html'
})
export class TopicDetailComponent  implements OnInit {
    constructor(private topicService: TopicService) { }

    ngOnInit(): void {
        this.topicService.listTopicOptions(this.topic).subscribe(
            options => this.options = options)
    }

    options: Option[];

    @Input()
    topic: Topic;
}
