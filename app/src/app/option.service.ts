import { Injectable } from '@angular/core';
import { Option } from './option'
import { OPTIONS } from './mock-options'
import { RequestMethod, Response } from '@angular/http';
import { ApiService } from './api.service'
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';

@Injectable()
export class OptionService {
    constructor(private apiService: ApiService) {
        this._list = new BehaviorSubject(null);
    }

    _list: BehaviorSubject<null>;

    list(): Observable<Option[]> {
        let subscription = this._list.mergeMap(() => {
            return this.apiService.request(
                RequestMethod.Get,
                'options/'
            );
        });
        this._list.next(null)
        return subscription;
    }

    update(option: Option, params: any): Observable<any> {
        return this.apiService.request(
            RequestMethod.Post,
            'options/' + option.id,
            params
        ).first().do((response) => {
            console.log("Option updated, notifying list to refresh");
            this._list.next(null)
        });
    }

    delete(option: Option): Observable<any> {
        return this.apiService.request(
            RequestMethod.Delete,
            'options/' + option.id,
        ).first().do((response) => {
            console.log("Option deleted, notifying list to refresh");
            this._list.next(null)
        });
    }

    create(name: string): Observable<Option> {
        return this.apiService.request(
            RequestMethod.Post,
            'options/',
            {'label': name}
        ).first().do((response) => {
            console.log("New option created, notifying list to refresh");
            this._list.next(null)
        });
    }
}
