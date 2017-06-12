import { NgForm, FormControl } from '@angular/forms';
import { Response } from '@angular/http';
import { ErrorManager } from './error-manager';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

export abstract class FormAbstract {
    loader: boolean = false;
    error: ErrorManager;
    isTrySubmitForm: boolean = false;

    showLoader() {
        this.loader = true;
    }

    hideLoader() {
        this.loader = false;
    }

    successHandler() {
        this.hideLoader();
    }

    handleError(res: any) {
        this.error = this.getErrorFromResponse(res);
    }

    getErrorFromResponse(res: any) {
        if (typeof this.hideLoader === 'function') {
            this.hideLoader();
        }
        if (res instanceof Response) {
            res = res.json();
        }

        return this.getErrorFromRequest(res);
    }

    getErrorFromRequest(res: any): ErrorManager {
    	let error: ErrorManager,
            errorsCode = [500, 401, 404];
        if (res.errors) {
            error = ErrorManager.createFromResponse(res.errors);
        } else if (res.message) {
            let errorManger = new ErrorManager();
            errorManger.formErrors.push(res.message);
            error = errorManger;
        } else if (res.error && (errorsCode.indexOf(res.error.code))) {
            let errorManger = new ErrorManager();
            errorManger.formErrors.push(res.error.message);
            error = errorManger;
        } else {
            throw new Error('Can not be reached');
        }
        return error;
    }

    /**
     * On submit form there should highlight all errors
     * @param form
     */
    showErrorOnSubmit(form: NgForm): boolean {
        this.isTrySubmitForm = true;
        for (let key in form.controls) {
            if (form.controls.hasOwnProperty(key)) {
                let control: FormControl = <FormControl>form.controls[key];
                if (control.invalid) {
                    control.markAsDirty();
                    break;
                }
            }
        }
        return form.valid;
    }

    /**
     * Set observer on stream
     *
     * @returns {Subscriber<T>}
     */
    observer(nextHandler?: Function) {
        return Subscriber.create(nextHandler || this.next.bind(this), this.handleError.bind(this), this.successHandler.bind(this));
    }


    /**
     * Default subscriber
     *
     * @param stream$
     * @param nextHandler
     * @returns {Subscription|Object|TeardownLogic|o.Statement[]|AnonymousSubscription|any<any>|any}
     */
    subscribe(stream$: Observable<any>, nextHandler?: Function): Subscription {
        this.showLoader();
        return stream$.subscribe(this.observer(nextHandler));
    }

    /**
     * Default next handler
     *
     * @param result
     */
    next(result: any) {}
}
