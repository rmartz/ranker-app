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
    constructor(private apiService: ApiService) { }

    _list: BehaviorSubject<Option[]>;

    list(): Observable<Option[]> {
        if(!this._list) {
            this._list = new BehaviorSubject([]);
            this.apiService.request(
                RequestMethod.Get,
                'options/'
            ).subscribe((response) => this._list.next(response))
        }
        return this._list;
    }

    update(option: Option, params: any): Observable<any> {
        return this.apiService.request(
            RequestMethod.Post,
            'options/' + option.id,
            params
        ).first().do((response) => {
            console.log("Option updated, notifying list to refresh");
            this._list.first().subscribe((list) => {
                let index = list.indexOf(option);
                list[index] = response;
                this._list.next(list);
            })
        });
    }

    delete(option: Option): Observable<any> {
        return this.apiService.request(
            RequestMethod.Delete,
            'options/' + option.id,
        ).first().do((response) => {
            console.log("Option deleted, notifying list to refresh");
            this._list.first().subscribe((list) => {
                let index = list.indexOf(option);
                list.splice(index, 1);
                this._list.next(list);
            })
        });
    }

    create(name: string): Observable<Option> {
        return this.apiService.request(
            RequestMethod.Post,
            'options/',
            {'label': name}
        ).first().do((response) => {
            console.log("New option created, notifying list to refresh");
            this._list.first().subscribe((list) => {
                list.push(response)
                this._list.next(list);
            })
        });
    }
}
