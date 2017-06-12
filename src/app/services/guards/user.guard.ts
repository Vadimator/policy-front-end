import { UserService } from './../api/user.service';
import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class UserGuard implements CanActivateChild {

    constructor(private userService: UserService, private router: Router) {}

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.userService.isLogin()) {
            return true;
        } else {
            this.router.navigate(['/register']);
            return false;
        }
    }
}
