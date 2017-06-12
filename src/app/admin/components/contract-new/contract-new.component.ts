import { Router } from '@angular/router';
import { ContractTypeService } from './../../../services/api/contract-type.service';
import { ContractTypeModel } from './../../../models/contract-type.model';
import { ContractModel } from './../../../models/contract.model';
import { ContractService } from './../../../services/api/contract.service';
import { Component, OnInit } from '@angular/core';
import {FormAbstract} from "app/services/form-abstract";

@Component({
  selector: 'admin-contract-new',
  templateUrl: './contract-new.component.html',
  styleUrls: ['./contract-new.component.css']
})
export class ContractNewComponent extends FormAbstract implements OnInit {

    contract: ContractModel = new ContractModel();
    
    protected contractTypes: ContractTypeModel[] = [];

    constructor(
        private _contractService: ContractService,
        private _contractTypeService: ContractTypeService,
        private router: Router
    ) {
        super();
    }

    ngOnInit() {
        this._contractTypeService.all().subscribe((contractTypes: ContractTypeModel[]) => {
            this.contractTypes = contractTypes;
            if(this.contractTypes.length > 0) {
                this.contract.type = this.contractTypes[0].id;
            }
        });
    }

    createContract() {
        this.subscribe(this._contractService.new(this.contract), () => {
            this.next(this.router.navigate(['/admin/contracts']));
        });
    }

    protected onChangeType(id: number) {
       this.contract.type = id;
    }
 
}

