import { ContractModel } from './../../../models/contract.model';
import { ContractService } from './../../../services/api/contract.service';
import { Component, OnInit } from '@angular/core';

import * as moment_ from 'moment';

@Component({
  selector: 'admin-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {

  protected contractList: ContractModel[] = [];

  constructor(
    private _contractService: ContractService
  ) {}

  ngOnInit() {
    this._contractService.all().subscribe((contracts: ContractModel[]) => {
      this.contractList = contracts;
    });
  }

  protected convertTime(time: string): string {
    return moment_(time).format('DD-MM-YYYY');
  }
}

