import { Component, Input, OnChanges } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'field-label',
    template: `
        <label [attr.for]="inputId" class="form__label {{theme}}" [class.form__label--disable]="isDisabled">
            <ng-content></ng-content>
        </label>
    `,
})
export class FieldLabelComponent {
    @Input() theme: string = 'default';
    @Input() inputId: string;
    @Input() isDisabled: boolean = false;
}
