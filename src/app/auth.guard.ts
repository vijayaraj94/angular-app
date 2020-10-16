import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { SharedServiceService } from './shared-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private auth: AuthService,
    private myRoute: Router, 
    private activeroute: ActivatedRoute,
    private sharedService: SharedServiceService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log(this.auth.isLoggedIn(), '---this.auth.isLoggedIn()');
      if(this.auth.isLoggedIn()){
        return true;
      }else{
        this.myRoute.navigate(["login"]);
        return false;
      }
  }

  
}
