import { EventModel } from './../../models/event.model';
import { HttpClient } from './../http-client.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';


@Injectable()
export class EventService {

constructor(
        private _http: HttpClient,
    ) { }

    new(event: EventModel) {
        return this._http.post('/api/event/new', event);
    }
}