import { Component, Input, OnInit, OnChanges, ElementRef, ViewChild, ContentChild, QueryList } from '@angular/core';
import { ErrorManager } from '../../../services/error-manager';
import { FieldLabelComponent } from '../field-label/field-label.component';

@Component({
    moduleId: module.id,
    selector: 'field-item',
    templateUrl: 'field-item.component.html'
})
export class FieldItemComponent implements OnInit, OnChanges {
    @Input() label: Element;
    @Input() error: ErrorManager;
    @Input() customErrorCondition: boolean = true;
    @Input() field: Element;
    @Input() inputName: string;
    @Input() showInfo: boolean = false;
    @Input() labelTheme: string = '';
    serverErrorCondition: boolean = false;
    inputId: string;
    @ViewChild('content') content: ElementRef;
    @ContentChild(FieldLabelComponent) labelComponent: FieldLabelComponent;

    getField() {
        if (this.field) {
            return this.field;
        }
        return this.content.nativeElement.firstElementChild;
    }

    ngOnInit() {
        if (this.getField()) {
            this.inputName = this.getField().getAttribute('name');
            this.inputId = this.getField().getAttribute('id');
            if (this.labelComponent) {
                this.labelComponent.inputId = this.inputId;
            }
            this.getField().addEventListener('click', () => {
                this.serverErrorCondition = false;
            });
        }
    }

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
