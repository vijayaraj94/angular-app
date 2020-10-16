import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from './shared-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route: Router, private sharedService: SharedServiceService) { }
  sendToken(token: string) {
    localStorage.setItem("LoggedInUser", token);
  }
  getToken() {
    return localStorage.getItem("LoggedInUser")
  }
  isLoggedIn() {
    this.sharedService.setLoginCredential(this.getToken());
    return this.getToken() !== null;
  }
  logout() {
    localStorage.removeItem("LoggedInUser");
    this.route.navigate(["Login"]);
  }
}
