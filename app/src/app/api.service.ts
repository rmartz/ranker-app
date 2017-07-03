import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class ApiService {
    token: BehaviorSubject<string>;
    server: string;

    constructor(private http: Http) {
        this.server = 'http://127.0.0.1:8000/api/';
        this.token = new BehaviorSubject(null);
    }

    signIn(username: string, password: string) {
        console.log("Signing in");
        this.token.next('11fb979804be6af7133e92917c760fb8d0c175f2');
    }

    request(method: RequestMethod, uri: string): Observable<Response> {
        this.signIn('foo', 'bar');

        return this.token.mergeMap((token: String) => {
            console.log("Using token " + token);
            let options = new RequestOptions({
                method: method
            })
            if(token) {
                options.headers = new Headers({
                    Authorization: 'Token ' + token
                })
            }
            return this.http.request(
                this.server + uri,
                options
            );
        })
    }
}
