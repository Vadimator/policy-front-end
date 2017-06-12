import { ContractModel } from './../../models/contract.model';
import { HttpClient } from './../http-client.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ContractService {

    constructor(
        private _http: HttpClient
    ) { }

    new(contract: ContractModel) {
        return this._http.post(`/api/contract/new`, contract);
    }

    all() {
        return this._http.get(`/api/contract/`);
    }
   
}