import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, subscribeOn, throwError } from 'rxjs';
import { Login } from './models/Login';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' ? true : false;
    this.role = localStorage.getItem('role') === 'admin' ? 'admin' : 'user';
  }

  url: string = "http://localhost:9000/ftr/userProfile"

  email!: string;
  id!: number;
  firstName !: string;
  lastName !: string;
  role !: string;
  isLoggedIn!: boolean;

  userLogin(creds: Login): Observable<any> {
    return this.http.get<User>(this.url+'/'+creds.email);
    // if(user.password==creds.password){
    //   return  of({userId:creds.email,firstName:user.firstName,lastName:user.lastName});
    // }
    // if(creds.email=="user" && creds.password=="user"){
    //   return  of({userId:1,firstName:'a',lastName:'b'});
    // }
    // return new Observable();
  }

  registerVendor(user: User): Observable<any> {
    const options = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post<any>(`${this.url}`, user, { headers: options })
  }

  adminLogin(creds: Login): Observable<any> {
    if(creds.email=="admin" && creds.password=="admin"){
      return  of({emailId:creds.email});
    }
    return new Observable();
  }

  saveLoggedInData(role: any, data: any) {
    localStorage.clear()
    this.email = data.emailId
    this.role = role
    localStorage.setItem("email", this.email)
    localStorage.setItem("role", this.role)

    if (role === "user") {
      this.id = data.userId
      localStorage.setItem("id", this.id.toString())
      this.firstName = data.firstName
      this.lastName = data.lastName
    } else {
      this.firstName = "Admin"
      this.lastName = ""
    }

    localStorage.setItem("firstName", this.firstName)
    localStorage.setItem("lastName", this.lastName)

    this.isLoggedIn = true;
    localStorage.setItem("isLoggedIn", this.isLoggedIn.toString())

    console.log("Logged in successfully")
  }

  logout() {
    localStorage.clear();
    this.email = "";
    this.id = 0;
    this.firstName = "";
    this.lastName = "";
    this.role = "";
    this.isLoggedIn = false;
    console.log("Logged out successfully!")
    this.router.navigate(['/home'])
  }

}
