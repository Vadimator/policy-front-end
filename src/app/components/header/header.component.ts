import { Router } from '@angular/router';
import { UserService } from './../../services/api/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'header-navbar',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {
    protected isLogin: boolean = false;

     constructor(
         private userService: UserService,
         private router: Router
    ) {}

    ngOnInit() {
        this.isLogin = this.userService.isLogin()
    }

    getIsLogin() {
        return this.isLogin;
    }

    signOut() {
        this.userService.logout().subscribe(() => {
            this.router.navigate(['/login']);
        });
    }

}