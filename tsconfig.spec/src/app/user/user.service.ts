import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  url: string = "http://localhost:9000/ftr/userProfile"

  fetchUserById(id: any): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  updateUserById(data: any, id: number) {
    const options = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.put<any>(`${this.url}/${id}`, data, { headers: options })
  }
}
