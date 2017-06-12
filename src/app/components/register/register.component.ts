import { Router } from '@angular/router';
import { UserService } from './../../services/api/user.service';
import { RegisterUserModel } from './register.model';
import { Component, OnInit } from '@angular/core';
import { FormAbstract } from "./../../services/form-abstract";

@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})

export class RegisterComponent extends FormAbstract implements OnInit {

    protected user: RegisterUserModel = new RegisterUserModel();
    
    constructor(
        private _userService: UserService,
        private router: Router
    ) { 
        super();
    }

    ngOnInit() { }

    register() {
        this.subscribe(this._userService.register({email: this.user.email, password: this.user.password}), () => {
            this.next(this.router.navigate(['/admin/contracts']));
        }); 
    }
}