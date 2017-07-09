import { Injectable } from '@angular/core';
import { Topic } from './topic'
import { TOPICS } from './mock-topics'
import { Option } from './option'
import { OPTIONS } from './mock-options'
import { RequestMethod, Response } from '@angular/http';
import { ApiService } from './api.service'
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';

@Injectable()
export class TopicService {
    constructor(private apiService: ApiService) {
        this._topics = {};
        this._list = new BehaviorSubject(null);
    }

    _list: BehaviorSubject<null>
    _topics: {}

    list(): Observable<Topic[]> {
        let subscription = this._list.mergeMap(() => {
            return this.apiService.request(
                RequestMethod.Get,
                'topics/'
            );
        });
        this._list.next(null)
        return subscription;
    }

    get(id: number): Observable<Topic> {
        if(!this._topics[id]) {
            console.log("Creaing subscription for topic " + id + " data");
            this._topics[id] = new BehaviorSubject(null);
        }
        let subscription = this._topics[id].mergeMap(() => {
            return this.apiService.request(
                RequestMethod.Get,
                'topics/' + id
            );
        });
        this._topics[id].next()
        return subscription;
    }

    create(name: string): Observable<Topic> {
        let observable = this.apiService.request(
            RequestMethod.Post,
            'topics/',
            {'label': name}
        ).first()
        observable.subscribe((response) => {
            console.log(response)
            // Ping so any subscribers know a new contest is available
            console.log("New topic created, notifying list to refresh");
            this._list.next(null)
        });
        return observable;
    }

    update(topic: Topic, params: any): Observable<any> {
        let observable = this.apiService.request(
            RequestMethod.Post,
            'topics/' + topic.id,
            params
        ).first()
        observable.subscribe((response) => {
            console.log(response)
            // Ping so any subscribers know a new contest is available
            console.log("Topic updated, notifying subscriptions to refresh");
            this._list.next(null);
            this._topics[topic.id].next(null);
        });
        return observable;
    }

    listTopRankings(topic: Topic, count: number): Observable<Option[]> {
        return this.apiService.request(
            RequestMethod.Get,
            'topics/' + topic.id + '/rankings?' + count
        );
    }
}
