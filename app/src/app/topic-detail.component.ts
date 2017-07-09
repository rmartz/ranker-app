import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { TopicService } from './topic.service'
import { ContestService } from './contest.service'
import { RankingsService } from './rankings.service'
import { TopicOptionService } from './topicoption.service'
import { Topic } from './topic'
import { Option } from './option'

@Component({
  selector: 'app-topic-detail',
  templateUrl: 'app/topic-detail.component.html'
})
export class TopicDetailComponent implements OnInit {
    constructor(private route: ActivatedRoute,
                private topicService: TopicService,
                private topicOptionService: TopicOptionService,
                private rankingsService: RankingsService,
                private contestService: ContestService) { }

    ngOnInit() {
        this.route.params
            .mergeMap((params: any) => this.topicService.get(params.id)).subscribe(topic => this.updateTopic(topic));
    }

    updateTopic(topic: Topic) {
        this.topic = topic;
        this.topicOptionService.list(this.topic).subscribe(
            options => this.options = options.sort((a,b) =>
                a.label.localeCompare(b.label)
            ))
        this.rankingsService.top_n(this.topic, 5).subscribe(
            rankings => this.top_rankings = rankings)
        this.contestService.get(this.topic).subscribe(
            contest => this.contest = contest)
    }

    updateName(name: string) {
        console.log("Updating name to '" + name + "'")
        this.topicService.update(this.topic, {'label': name})
    }


    selectWinner(winner: Option) {
        this.contestService.vote(this.topic, winner);
    }

    options: Option[];
    contest: Option[];
    top_rankings: Option[];

    topic: Topic;
}
