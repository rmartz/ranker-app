import { Injectable } from '@angular/core';
import { Topic } from './topic'
import { Option } from './option'
import { RequestMethod, Response } from '@angular/http';
import { ApiService } from './api.service'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/first';

@Injectable()
export class ContestService {
    constructor(private apiService: ApiService) {
        this._subscriptions = {};
    }

    _subscriptions: {}

    get(topic: Topic): Observable<Option[]> {
        if(!this._subscriptions[topic.id]) {
            console.log("Creaing subscription for topic " + topic.id + " contests");
            let subscription = new Subject();
            this._subscriptions[topic.id] = subscription

            this.apiService.request(
                    RequestMethod.Get,
                    'topics/' + topic.id + '/contests'
                ).subscribe((response) =>
                    subscription.next(response))
        }

        return this._subscriptions[topic.id];
    }

    vote(topic: Topic, winner: Option) {
        console.log("Voting for " + winner.id);
        return this.apiService.request(
            RequestMethod.Post,
            'topics/' + topic.id + '/contests',
            {'winner': winner.id}
            // Since we're changing state unsubscribe after the first response.
        ).first().subscribe(() => {
            console.log("Fetching new contest for listeners")
            this.apiService.request(
                    RequestMethod.Get,
                    'topics/' + topic.id + '/contests'
                ).subscribe((response) =>
                    this._subscriptions[topic.id].next(response))
            });
    }
}
