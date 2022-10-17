import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Vehicle } from '../models/Vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  url = 'http://localhost:9000/ftr/vehicles';
  getVehiclesUrl = this.url;
  postInsertUrl = this.url;
  getByNameUrl = 'http://localhost:9000/ftr/vehicles/managed-name/'
  getByNumberUrl = 'http://localhost:9000/ftr/vehicles/managed-number/'
  putStatusUrl = 'http://localhost:9000/ftr/vehicles/'
  delVehicleUrl = 'http://localhost:9000/ftr/vehicles/'

  constructor(private http: HttpClient) { }

  insertVehicle(vehicle: any): Observable<any> {
    const options = new HttpHeaders({ 'responseType': 'text', 'HttpErrorResponse': 'application/json' });
    return this.http.post(this.postInsertUrl, vehicle);
    // .pipe(
    //   tap(data => console.log(data)),
    //   catchError(this.handleError)
    // );
  }

  fetchAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.getVehiclesUrl).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  fetchVehicleByName(name: String): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.getByNameUrl + name).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  fetchVehicleByNumber(id: String): Observable<Vehicle> {
    return this.http.get<Vehicle>(this.getByNumberUrl + id).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  updateVehicleStatus(id: String, form: Vehicle): Observable<any> {
    const options = new HttpHeaders({ 'responseType': 'text', 'HttpErrorResponse': 'application/json' });
    return this.http.put(this.putStatusUrl + id, form).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  removeVehicle(id: String): Observable<any> {
    return this.http.delete(this.delVehicleUrl + id).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  handleError(err: HttpErrorResponse) {
    let errMsg: string = '';
    console.log(err);
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', err.error.message);
      errMsg = err.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(`Backend returned code ${err.status}`);
      console.log(`Backend error message ${err.message}`);
      console.log(err.error.error);
      errMsg = err.error.message;
    }
    return throwError(errMsg);
  }
}
