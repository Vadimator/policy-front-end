import { Component, Input, OnChanges } from '@angular/core';
import { ErrorManager } from '../../../services/error-manager';

@Component({
    moduleId: module.id,
    selector: 'form-error',
    template: `
        <div class="form__alert text-center" *ngIf="!!getError().length">
            <ng-content select="error-item" *ngIf="customErrorCondition"></ng-content>
            <error-item *ngFor="let item of getError()" [condition]="serverErrorCondition">{{item}}</error-item>
        </div>
    `
})
export class FormErrorComponent implements OnChanges {

    @Input() error: ErrorManager;
    @Input() customErrorCondition: boolean = true;
    serverErrorCondition: Object = false;

    ngOnChanges(changes: any) {
        if (changes.error && changes.error.currentValue) {
            this.serverErrorCondition = !!changes.error.currentValue;
        }
    }

    /**
     * Get errors
     *
     * @returns {any}
     */
    getError(field: string): string[] {
        if (this.error instanceof ErrorManager) {
            return this.error.getErrors(field);
        }
        return [];
    }
}
