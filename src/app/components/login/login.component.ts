import { UserService } from './../../services/api/user.service';
import { UserModel } from './../../models/user.model';
import { Component } from '@angular/core';
import { FormAbstract } from "./../../services/form-abstract";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent extends FormAbstract {
    user: UserModel;

    constructor(
        private _userService: UserService,
        private router: Router,
    ) {
        super();
        this.user = {
            email: '',
            password: ''
        };
    }

    login() {
        this.subscribe(this._userService.login(this.user), () => {
            this.next(this.router.navigate(['/admin/contracts']));
        });
    }
}