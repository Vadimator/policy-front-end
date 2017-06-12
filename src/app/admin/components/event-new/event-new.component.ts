import { ContractService } from './../../../services/api/contract.service';
import { ContractModel } from './../../../models/contract.model';
import { EventModel } from './../../../models/event.model';
import { FormAbstract } from 'app/services/form-abstract';
import { EventService } from './../../../services/api/event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-event-new',
  templateUrl: './event-new.component.html',
  styleUrls: ['./event-new.component.css']
})
export class EventNewComponent extends FormAbstract implements OnInit {

    protected event: EventModel = new EventModel();
    protected contracts: ContractModel[] = [];

    constructor(
        private _eventService: EventService,
        private _contractService: ContractService
    ) {
        super();
    }

    ngOnInit() {
        this.getContracts();
    }
    
    protected getContracts() {
        this._contractService.all().subscribe((contracts: ContractModel[]) => {
            this.contracts = contracts;
            this.event.type = this.contracts[0].id;
        });
    }

    protected onChangeContract(contractId: number) {
        this.event.id = contractId;
    }

    protected fileChangeEvent(fileInput: any) {
        let fileList: FileList = fileInput.target.files;
        if(fileList.length > 0) {
            this.event.file = fileList[0];
            // this.event.file = formData;
        }
    }

    createEvent() {
        this.subscribe(this._eventService.new(this.event), (res: any) => {
            console.log(res);
        });
    }
}