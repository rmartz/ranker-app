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

    request(method: RequestMethod, uri: string, payload?: {}): Observable<any> {
        // If the user's token changes repeat the request. If we don't have any
        // subscribers nothing will happen, if we do then they'll get updated
        // values.
        return this.token.mergeMap((token: String) => {
            console.log("Using token " + token);
            let options = new RequestOptions({
                method: method,
                headers: new Headers({
                    Authorization: 'Token ' + token
                })
            })
            if(payload) {
                let params = new URLSearchParams();
                for(let param in payload) {
                    params.append(param, payload[param]);
                }
                options.headers.append('Content-Type', 'application/x-www-form-urlencoded');
                options.body = params.toString()
            }
            return this.http.request(
                this.server + uri,
                options
            ).map((response: Response) => {
                return response.json();
            });
        })
    }
}
