import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private userId: string = '';
  private isAdmin: boolean = false;
  private isUser: boolean = false;
//   public valueEmmiter: BehaviorSubject<{
//     userId: string;
//     isAdmin: boolean;
//     isUser: boolean;
//   }> = new BehaviorSubject({ userId: '', isAdmin: false, isUser: false });
  constructor() {}
  updateValues(userId: string, isAdmin: boolean, isUser: boolean) {
    this.isAdmin = isAdmin;
    this.isUser = isUser;
    this.userId = userId;
    // this.valueEmmiter.next({
    //   userId: userId,
    //   isAdmin: isAdmin,
    //   isUser: isUser,
    // });
  }
}