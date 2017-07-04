import { Component, OnInit, Input } from '@angular/core';

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
export class TopicDetailComponent {
    constructor(private topicOptionService: TopicOptionService,
                private rankingsService: RankingsService,
                private contestService: ContestService) { }

    ngOnChanges(...args: any[]) {
        this.topicOptionService.list(this.topic).subscribe(
            options => this.options = options)
        this.rankingsService.top_n(this.topic, 5).subscribe(
            rankings => this.top_rankings = rankings)
        this.contestService.get(this.topic).subscribe(
            contest => this.contest = contest)
    }

    selectWinner(winner: Option) {
        this.contestService.vote(this.topic, winner);
    }

    options: Option[];
    contest: Option[];
    top_rankings: Option[];

    @Input()
    topic: Topic;
}
