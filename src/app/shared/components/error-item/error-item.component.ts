import { Component, Input, OnChanges } from '@angular/core';
import { ErrorManager } from '../../../services/error-manager';

@Component({
    moduleId: module.id,
    selector: 'error-item',
    template: `
        <ng-container *ngIf="getError() && !condition && serverErrorCondition">
            <div class="error-item">
                <ng-container *ngIf="getError(errorFieldName)">
                    <div class="text-danger" *ngFor="let text of getError(errorFieldName)">{{text}}</div>
                </ng-container>
            </div>
        </ng-container>
        <ng-container *ngIf="condition">
            <div class="error-item">
                <div class="text-danger">
                    <ng-content></ng-content>
                </div>
            </div>
        </ng-container>
    `,
})
export class ErrorItemComponent implements OnChanges {
    @Input() condition: boolean;

    // This fields manage server errors
    @Input() error: ErrorManager;
    // Field name which should be managed
    @Input() errorFieldName: string;
    // Show errors or not
    @Input() serverErrorCondition: boolean = false;

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
