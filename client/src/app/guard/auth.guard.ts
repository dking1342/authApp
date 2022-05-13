import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
  
  constructor(
    private auth: AuthService, 
    private router: Router,
    private user: UserService    
  ){};

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem("user")){
        this.auth.setLoggedIn(true);
        return true;
      } else {
        this.auth.setLoggedIn(false);
        this.router.navigate(['login']);
        return false;
      }
      
      // using cookie and sessions with php mock backend
      // if(this.auth.isLoggedIn){
      //   return true;
      // }
      // return this.user.isLoggedIn().pipe(map(res => {
      //   if(res.status){
      //     this.auth.setLoggedIn(true);
      //     return true
      //   } else {
      //     this.router.navigate(['login']);
      //     return false;
      //   }
      // }));
      
      // using localstorage
      // bug if cookie is deleted and browser not refreshed
      // if(!this.auth.isLoggedIn){
      //   this.router.navigate(['login']);        
      // }
      // return this.auth.isLoggedIn;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
