import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { WorkItems } from '../models/WorkItems';

@Injectable({
  providedIn: 'root'
})
export class WorkItemsService {

  constructor(private http: HttpClient) { }
  getItems(): Observable<WorkItems[]> {
    return this.http.get<WorkItems[]>('http://localhost:9000/ftr/workItems')
    // .pipe(
    //   tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data))),
    //   catchError(this.handleError));
  }
  addItems(items: WorkItems): Observable<any> {
    console.log(items)
    const options = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('http://localhost:9000/ftr/workItems/addItem', items, { headers: options }).pipe(
      catchError(this.handleError));
  }
  updateItems(items: WorkItems): Observable<any> {
    const options = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>('#', items, { headers: options }).pipe(
      tap((_: any) => console.log(`updated hero id=${items.userId}`)),
      catchError(this.handleError)
    );
  }
  private handleError(err: HttpErrorResponse): Observable<any> {
    let errMsg = '';
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', err.error.message);
      errMsg = err.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(`Backend returned code ${err.status}`);
      errMsg = err.error.status;
    }
    return throwError(() => errMsg);
  }
}
