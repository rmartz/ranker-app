import { Component, ViewChild } from '@angular/core';
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

    creatingTopic: boolean;
    @ViewChild('name') input: any;

    getTopics(): void {
        this.topicService.list().subscribe(topics => this.topics = topics)
    }

    createTopic(name: string): void {
        this.topicService.create(name).subscribe(() => {
            this.creatingTopic = false;
            this.input.nativeElement.value = '';
        });
    }
}
