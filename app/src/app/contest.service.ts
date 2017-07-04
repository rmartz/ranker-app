import { Injectable } from '@angular/core';
import { Topic } from './topic'
import { Option } from './option'
import { RequestMethod, Response } from '@angular/http';
import { ApiService } from './api.service'
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/first';

@Injectable()
export class ContestService {
    constructor(private apiService: ApiService) {
        this._topics = {};
    }

    _topics: {}

    get(topic: Topic): Observable<Option[]> {
        if(!this._topics[topic.id]) {
            console.log("Creaing subscription for topic " + topic.id + " contests");
            this._topics[topic.id] = new BehaviorSubject(null);
        }
        let subscription = this._topics[topic.id].mergeMap(() => {
            console.log("Loading contest for " + topic.id)
            return this.apiService.request(
                RequestMethod.Get,
                'topics/' + topic.id + '/contests'
            );
        });
        this._topics[topic.id].next()
        return subscription;
    }

    vote(topic: Topic, winner: Option) {
        console.log("Voting for " + winner.id);
        return this.apiService.request(
            RequestMethod.Post,
            'topics/' + topic.id + '/contests',
            {'winner': winner.id}
            // Since we're changing state unsubscribe after the first response.
        ).first().subscribe((response) => {
            console.log(response)
            // Ping so any subscribers know a new contest is available
            console.log("Notifying to request for another contest");
            this._topics[topic.id].next()
        });
    }
}
