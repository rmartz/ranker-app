import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Topic } from './topic'
import { TopicService } from './topic.service'

@Component({
  selector: 'app-topic-list',
  templateUrl: 'app/topic-list.component.html',
})
export class TopicListComponent implements OnInit {
    constructor(private topicService: TopicService) { }

    ngOnInit(): void {
        this.getTopics();
    }

    topics: Topic[];

    getTopics(): void {
        this.topicService.list().subscribe(topics => this.topics = topics)
    }
}
