import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from 'src/app/shared-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns = ['username', 'email_id', 'phone_no', 'password'];

  dataSource = [];
  userResult = [];

  constructor(
    private sharedService: SharedServiceService,
  ) { }

  ngOnInit() {
    this.sharedService.getUserList.subscribe(res => {
      console.log('res', res);
      this.dataSource = res || [];
    })
  }

}
