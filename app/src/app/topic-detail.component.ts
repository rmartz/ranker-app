import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { TopicService } from './topic.service'
import { ContestService } from './contest.service'
import { RankingsService } from './rankings.service'
import { Topic } from './topic'
import { Option } from './option'

@Component({
  selector: 'app-topic-detail',
  templateUrl: 'app/topic-detail.component.html'
})
export class TopicDetailComponent implements OnInit {
    constructor(private route: ActivatedRoute,
                private router: Router,
                private topicService: TopicService,
                private rankingsService: RankingsService,
                private contestService: ContestService) { }

    ngOnInit() {
        this.route.params
            .mergeMap((params: any) => this.topicService.get(params.id))
            .subscribe(topic => this.updateTopic(topic),
                       () => this.router.navigate(['topics'])
        );
    }

    updateTopic(topic: Topic) {
        if(!topic.id) {
            return;
        }

        this.topic = topic;
        this.rankingsService.top_n(this.topic, 5).subscribe(
            rankings => this.top_rankings = rankings)
        this.contestService.get(this.topic).subscribe(
            contest => this.contest = contest,
            () => this.contest = null)
    }

    selectWinner(winner: Option) {
        this.contestService.vote(this.topic, winner);
    }

    skipContest() {
        this.contestService.skip(this.topic);
    }

    contest: Option[];
    top_rankings: Option[];

    topic: Topic;
}
