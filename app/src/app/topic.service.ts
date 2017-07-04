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

    listTopics(): Observable<Topic[]> {
        return this.apiService.request(
            RequestMethod.Get,
            'topics/'
        );
    }

    listTopicOptions(topic: Topic): Observable<Option[]> {
        return this.apiService.request(
            RequestMethod.Get,
            'topics/' + topic.id + '/options'
        );
    }

    listTopRankings(topic: Topic, count: number): Observable<Option[]> {
        return this.apiService.request(
            RequestMethod.Get,
            'topics/' + topic.id + '/rankings?' + count
        );
    }
}
