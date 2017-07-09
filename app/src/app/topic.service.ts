import { Injectable } from '@angular/core';
import { Topic } from './topic'
import { TOPICS } from './mock-topics'
import { Option } from './option'
import { OPTIONS } from './mock-options'
import { RequestMethod, Response } from '@angular/http';
import { ApiService } from './api.service'
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class TopicService {
    constructor(private apiService: ApiService) { }

    list(): Observable<Topic[]> {
        return this.apiService.request(
            RequestMethod.Get,
            'topics/'
        );
    }

    get(id: number): Observable<Topic> {
        return this.apiService.request(
            RequestMethod.Get,
            'topics/' + id
        );
    }

    create(name: string): Observable<Topic> {
        return this.apiService.request(
            RequestMethod.Post,
            'topics/',
            {'label': name}
        ).first()
    }

    update(topic: Topic, params: any): Observable<any> {
        return this.apiService.request(
            RequestMethod.Post,
            'topics/' + topic.id,
            params
        ).first()
    }

    listTopRankings(topic: Topic, count: number): Observable<Option[]> {
        return this.apiService.request(
            RequestMethod.Get,
            'topics/' + topic.id + '/rankings?' + count
        );
    }
}
