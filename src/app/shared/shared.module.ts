import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ErrorItemComponent } from './components/error-item/error-item.component';
import { FieldItemComponent } from './components/field-item/field-item.component';
import { FieldLabelComponent } from './components/field-label/field-label.component';
import { FormErrorComponent } from './components/form-error/form-error.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        ErrorItemComponent,
        FieldItemComponent,
        FieldLabelComponent,
        FormErrorComponent,
        LoaderComponent
    ],
    declarations: [
        ErrorItemComponent,
        FieldItemComponent,
        FieldLabelComponent,
        FormErrorComponent,
        LoaderComponent
    ],
    providers: [],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: []
        };
    }
}

