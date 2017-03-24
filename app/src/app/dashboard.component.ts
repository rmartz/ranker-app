import { Component, OnInit } from '@angular/core';

import { TopicService } from './topic.service'
import { Topic } from './topic'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    constructor(private topicService: TopicService) { }

    ngOnInit(): void {
        this.topicService.listTopics().then(topics => this.topics = topics)
    }

    topics: Topic[];
}
