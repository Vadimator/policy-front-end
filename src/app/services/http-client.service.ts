import { SecurityService } from './security.service';
import { SecurityModel } from './../models/security.model';
import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from './config';

@Injectable()
export class HttpClient {

    public apiUrl: string;
    protected stopIteration: number = 3;
    protected countIteration: number = 0;

    static handle(res: any) {
        if (res instanceof Response) {
            return res.json();
        }
        return res;
    }

    constructor(
        private http: Http,
        private securityService: SecurityService,
    ) {
        this.apiUrl = Config.BASE_URL;
    }


    /**
     * Get request
     *
     * @param route
     * @param search
     * @returns {Observable}
     */
    get(route: string, search?: any): Observable<any> {
        let params = '';
        if (search) {
            for (let param in search) {
                if (search.hasOwnProperty(param) && param) {
                    if (Array.isArray(search[param])) {
                        for (let i of search[param]) {
                            params += param + '[]=' + i + '&';
                        }
                    } else {
                        params += param + '=' + search[param] + '&';
                    }
                }
            }
        }
        params = params.slice(0, -1);
        return this.handleCatch(this.http.get(
            this.apiUrl + route,
            new RequestOptions({
                headers: this.getHeaders(),
                search: params
            })
        ), () => {
            return this.get(route, search);
        });
    }

    /**
     * Send post request
     *
     * @param route
     * @param data
     * @param headers
     * @returns {Observable}
     */
    post(route: string, data?: any, headers?: any) {
        const headersObject = this.getHeaders();
        for (let key in headers) {
            if (headers.hasOwnProperty(key)) {
                headersObject.append(key, headers[key]);
            }
        }

        return this.handleCatch(this.http.post(
            this.apiUrl + route,
            JSON.stringify(data), {headers: headersObject}
        ), () => {
            return this.http.post(
                this.apiUrl + route,
                JSON.stringify(data), {headers: headersObject}
            );
        });
    }

    /**
     * Send delete request
     *
     * @param route
     * @returns {Observable}
     */
    remove(route: string) {
        return this.handleCatch(
            this.http.delete(
                this.apiUrl + route,
                {headers: this.getHeaders()}
            ),
            () => {
                return this.http.delete(
                    this.apiUrl + route,
                    {headers: this.getHeaders()}
                );
            }
        );
    }

    /**
     * Save
     *
     * @param route
     * @param data
     * @returns {Observable}
     */
    put(route: string, data?: any) {
        return this.handleCatch(
            this.http.put(
                this.apiUrl + route,
                JSON.stringify(data), {headers: this.getHeaders()}
            ),
            () => {
                return this.http.put(
                    this.apiUrl + route,
                    JSON.stringify(data), {headers: this.getHeaders()}
                );
            }
        );
    }

    /*
     * Get system token
     */
    protected getToken(): Observable<SecurityModel> {

        // If token exists then use it or get new
        // if (this.securityService.getAccessToken()) {
        //     return Observable.of(this.securityService.getSecurityModel());
        // } else {
            return this.securityService.handleUserRequest(
                this.http.post(this.apiUrl + '/token/refresh', {refresh_token: this.securityService.getRefreshToken()})
                    .catch((err: any) => {
                        this.securityService.flushCredentials();

                        // this.routerService.navigate(['/security/sign-in']);

                        if (err instanceof Response) {
                            return Observable.throw(err.json());
                        }
                        return Observable.throw(err);
                    })
                    .map(HttpClient.handle)
            );
        // }
    }

    protected handleCatch(stream$: Observable<any>, retry: Function): Observable<any> {

        return stream$.catch((err: any) => {
            // Avoid recursion problem by using counters and stops
            if ((err.status === 401 || err.status === 403) && this.countIteration < this.stopIteration) {

                this.countIteration++;
                return this.getToken().flatMap(() => {
                    return retry();
                });
            }
            if (err instanceof Response) {
                return Observable.throw(err.json());
            }
            return Observable.throw(err);
        })
        .map((param: any) => {
            this.countIteration = 0;
            return param;
        })
        .map(HttpClient.handle);
    }

    /**
     * Get request headers
     */
    public getHeaders(onlyAuthorization = false): Headers {
        let headers: Headers;
        if (onlyAuthorization) {
             headers = new Headers({'Authorization': 'Bearer ' + this.securityService.getAccessToken()});
        } else {
            headers = new Headers({'Accept': 'application/json'});
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', 'Bearer ' + this.securityService.getAccessToken());
        }
        return headers;
    }
}