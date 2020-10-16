import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  private sample = new BehaviorSubject<any>([]);
  sampleData = this.sample.asObservable();

  private setUserDetail = new BehaviorSubject<any>([]);
  getUserList = this.setUserDetail.asObservable();
  
  private loginCredential = new BehaviorSubject<any>('');
  loginCredential_data = this.loginCredential.asObservable();

  constructor() { }

  setFormData(data: any) {
    this.sample.next(data);
  }

  sendUserData(data: any) {
    this.setUserDetail.next(data);
  }
   
  setLoginCredential(data: any) {
    this.loginCredential.next(data);
  }
}
