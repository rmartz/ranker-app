import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { Topic } from './topic'
import { TopicService } from './topic.service'

@Component({
  selector: 'app-topic-create',
  templateUrl: 'app/topic-create.component.html',
})
export class TopicCreateComponent {
    constructor(private topicService: TopicService) { }

    creating: boolean;
    @ViewChild('name') input: any;

    create(name: string): void {
        this.topicService.create(name).subscribe(() => {
            this.creating = false;
            this.input.nativeElement.value = '';
        });
    }
}
