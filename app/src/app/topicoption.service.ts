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
export class TopicOptionService {
    constructor(private apiService: ApiService) { }
    list(topic: Topic): Observable<Option[]> {
        return this.apiService.request(
            RequestMethod.Get,
            'topics/' + topic.id + '/options'
        );
    }

    delete(topic: Topic, option: Option): Observable<Option[]> {
        return this.apiService.request(
            RequestMethod.Delete,
            'topics/' + topic.id + '/options/' + option.id
        );
    }

    add(topic: Topic, option: Option): Observable<Option[]> {
        return this.apiService.request(
            RequestMethod.Put,
            'topics/' + topic.id + '/options/' + option.id
        );
    }
}
