import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { SharedService } from '../shared.service';
import { AccountService } from 'src/app/account/account.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(
    private sharedService: SharedService,
    private accountService: AccountService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>{
    return this.accountService.user$.pipe(
      map((user: User | null) => {
        if(user) {
          return true;
        }else {
          this.sharedService.showNotification(false, 'Restricted Area', 'Leave immediately!');
          console.log(state.url);
          this.router.navigate(['account/login'], {queryParams: {returnUrl: state.url}});
          return false;
        }
      })
    )
  }
  
}
