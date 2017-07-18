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
        this._list = null;
    }

    _list: BehaviorSubject<Topic[]>
    _topics: {}

    list(): Observable<Topic[]> {
        if(!this._list) {
            this._list = new BehaviorSubject([])
            this.apiService.request(
                RequestMethod.Get,
                'topics/'
            ).subscribe((response) => this._list.next(response))
        }
        return this._list;
    }

    get(id: number): Observable<Topic> {
        if(!this._topics[id]) {
            console.log("Creaing subscription for topic " + id + " data");
            this._topics[id] = new BehaviorSubject({});

            this.apiService.request(
                RequestMethod.Get,
                'topics/' + id
            ).subscribe((response) => this._topics[id].next(response))
        }
        return this._topics[id];
    }

    create(name: string): Observable<Topic> {
        return this.apiService.request(
            RequestMethod.Post,
            'topics/',
            {'label': name}
        ).first().do((response) => {
            console.log("New topic created, notifying list to refresh");
            this._list.first().subscribe((list) => {
                list.push(response)
                this._list.next(list);
            });
        });
    }

    update(topic: Topic, params: any): Observable<any> {
        return this.apiService.request(
            RequestMethod.Post,
            'topics/' + topic.id,
            params
        ).first().do((response) => {
            console.log("Topic updated, notifying subscriptions to refresh");
            this._list.next(null);

            this._list.first().subscribe((list) => {
                let index = list.indexOf(topic);
                list[index] = response;
                this._list.next(list);
            })''
        });
    }

    delete(topic: Topic): Observable<any> {
        return this.apiService.request(
            RequestMethod.Delete,
            'topics/' + topic.id
        ).first().do((response) => {
            console.log("Topic deleted, notifying subscriptions to refresh");
            this._list.first().subscribe((list) => {
                let index = list.indexOf(topic);
                list.splice(index, 1);
                this._list.next(list);
            });
        });
    }

    listTopRankings(topic: Topic, count: number): Observable<Option[]> {
        return this.apiService.request(
            RequestMethod.Get,
            'topics/' + topic.id + '/rankings?' + count
        );
    }
}
