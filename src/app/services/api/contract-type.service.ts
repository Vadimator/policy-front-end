import { Observable } from 'rxjs/Observable';
import { ContractTypeModel } from './../../models/contract-type.model';
import { HttpClient } from './../http-client.service';
import { UserModel } from './../../models/user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ContractTypeService {

    constructor(
        private _http: HttpClient
    ) { }
    
    all(): Observable<ContractTypeModel[]> {
        return this._http.get(`/type/`);
    }
   
}