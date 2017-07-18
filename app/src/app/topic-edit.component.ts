import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs/Observable';

import { Topic } from './topic'
import { Option } from './option'
import { OptionService } from './option.service'
import { TopicService } from './topic.service'
import { TopicOptionService } from './topicoption.service'

import 'rxjs/add/observable/zip';

@Component({
  selector: 'app-topic-edit',
  templateUrl: 'app/topic-edit.component.html',
})
export class TopicEditComponent implements OnInit {
    constructor(private route: ActivatedRoute,
                private router: Router,
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
        if(!topic.id) {
            return;
        }

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

    toggleOption(option: Option) {
        let target = !this.enabledOptions[option.id]
        this.topicOptionService.set(this.topic, option, target)
            .subscribe(() => this.enabledOptions[option.id] = target)
    }

    updateName(name: string) {
        console.log("Updating name to '" + name + "'")
        this.topicService.update(this.topic, {'label': name}).subscribe()
    }

    delete() {
        this.topicService.delete(this.topic)
            .subscribe(() => this.router.navigate(['topics']))
    }
}
