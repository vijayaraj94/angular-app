import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
//import { AuthService } from 'src/app/auth.service';
import { element } from '@angular/core/src/render3';
import { SharedServiceService } from 'src/app/shared-service.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth.service';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  error: any;
  @ViewChild('registerModal') registerModal: TemplateRef<any>;
  registerForm: any = {};
  UserList = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(private myRoute: Router, 
    private authService: AuthService, 
    private sharedService: SharedServiceService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.sharedService.getUserList.subscribe(res => {
      console.log('res', res);
      this.UserList = res || [];
    })
  }

  submit() {
    const userDetails = this.UserList;
    const curr_user = userDetails.find(element => element.username === this.loginForm.value.username && element.password === this.loginForm.value.password);
    if(curr_user) {
      this.authService.sendToken(this.loginForm.value.username);
      this.myRoute.navigate(["dashboard"]);
    } else {
      this.error = 'Invalid Username and Password';
    }
  }

  openRegisterPopup() {
    this.error = '';
    const dialogRef = this.dialog.open(this.registerModal, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onSubmit() {
    this.loginForm.reset();
    const checkExistUser = this.UserList.find(element => element.username === this.registerForm.username);
    if(checkExistUser) {
      this.error = 'User Name already exist, please add new user';
      this.dialog.closeAll();
      this.registerForm = {};
      return false;
    }
    this.UserList.push(this.registerForm);
    this.sharedService.sendUserData(this.UserList);
    this.dialog.closeAll();
    this.registerForm = {};
    
    this._snackBar.open('Registration succeed', '', {
      duration: 500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });


  }
}
