import { Injectable } from '@angular/core';
import { Option } from './option'
import { OPTIONS } from './mock-options'
import { RequestMethod, Response } from '@angular/http';
import { ApiService } from './api.service'
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class OptionService {
    constructor(private apiService: ApiService) { }

    list(): Observable<Option[]> {
        return this.apiService.request(
            RequestMethod.Get,
            'options/'
        );
    }

    update(option: Option, params: any): Observable<any> {
        return this.apiService.request(
            RequestMethod.Post,
            'options/' + option.id,
            params
        ).first()
    }
}
