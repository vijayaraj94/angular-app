import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedServiceService } from './shared-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLogged: any = true;
  loggedUserName ='';
  
  constructor(private myRoute: Router, private sharedSerives: SharedServiceService, private activeroute: ActivatedRoute) { }
  ngOnInit() {
    
    this.sharedSerives.loginCredential_data.subscribe((res) => {
       if (res) {
         this.isLogged = true;
         this.loggedUserName = localStorage.getItem('LoggedInUser');
      } else {
         this.isLogged = false;
       }
    })

  }

  logout() {
    localStorage.removeItem("LoggedInUser");
    this.isLogged = false;
    this.myRoute.navigate(["login"]);
  }

  
}
