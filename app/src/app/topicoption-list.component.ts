import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable';

import { Topic } from './topic'
import { Option } from './option'
import { OptionService } from './option.service'
import { TopicService } from './topic.service'
import { TopicOptionService } from './topicoption.service'

import 'rxjs/add/observable/zip';

@Component({
  selector: 'app-topicoption-list',
  templateUrl: 'app/topicoption-list.component.html',
})
export class TopicOptionListComponent implements OnInit {
    constructor(private route: ActivatedRoute,
                private optionService: OptionService,
                private topicService: TopicService,
                private topicOptionService: TopicOptionService) { }

    ngOnInit(): void {
        this.route.params
            .mergeMap((params: any) => this.topicService.get(params.id))
            .subscribe(topic => this.loadOptions(topic))
    }

    options: Option[];
    enabledOptions = {};
    topic: Topic;

    loadOptions(topic: Topic): void {
        this.topic = topic;

        Observable.zip(
            this.optionService.list(),
            this.topicOptionService.list(topic)
        ).subscribe(
            (results: [Option[], Option[]]) =>
                this.configureTopicOptionMapping(results[0], results[1])
        )
    }

    configureTopicOptionMapping(options: Option[], topicOptions: Option[]) {
        this.options = options.sort((a,b) => a.label.localeCompare(b.label))

        this.enabledOptions = {}
        for(let option of topicOptions) {
            this.enabledOptions[option.id] = true;
        }
    }
}
