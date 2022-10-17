import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { WorkItems } from '../models/WorkItems';
@Injectable({
  providedIn: 'root'
})
export class WorkItemsService {
  FTR_WORK_ITEMS_URL: string = "http://localhost:9000/ftr/workItems";
  constructor(private http: HttpClient) { }
  fetchAvailableCountries(): Observable<any>{
    return this.http.get<string[]>(this.FTR_WORK_ITEMS_URL + "/managed-country").pipe(
      tap(data=>console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  fetchAvailableHarborLocations(fromCountry: string): Observable<any>{
    return this.http.get<string[]>(this.FTR_WORK_ITEMS_URL + "/" + fromCountry).pipe(
      tap(data=>console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  fetchWorkItems(): Observable<any>{
    return this.http.get<WorkItems[]>(this.FTR_WORK_ITEMS_URL).pipe(catchError(this.handleError));
  }

  fetchWorkItemsByUserId(userId: number): Observable<any>{
    return this.http.get<WorkItems[]>(this.FTR_WORK_ITEMS_URL + "/managed-user/" + userId);
    // .pipe(
    //   tap(data=>console.log(JSON.stringify(data))),
    //   catchError(this.handleError)
    // );
  }

  fetchWorkItemStatus(workItemId: string): Observable<any> {
    return this.http.get(this.FTR_WORK_ITEMS_URL + "/managed-status/" + workItemId).pipe(
      tap(data=>console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  createWorkItem(workItem: WorkItems): Observable<any>{
    return this.http.post<WorkItems>(this.FTR_WORK_ITEMS_URL, workItem).pipe(
      tap(data=>console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  // FTR_WORK_ITEMS_URL<T>(FTR_WORK_ITEMS_URL: any, workItem: WorkItems) {
  //   throw new Error('Method not implemented.');
  // }

  updateWorkItem(workItem: WorkItems, workItemId: string): Observable<any>{
    return this.http.put(this.FTR_WORK_ITEMS_URL + "/" + workItemId, workItem).pipe(
      catchError(this.handleError)
    );
  }

  updateWorkItemStatus(workItem: WorkItems, workItemId: string): Observable<any>{
    return this.http.put<String>(this.FTR_WORK_ITEMS_URL + "/managed-update/" + workItemId, workItem).pipe(
      tap(data=>console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  assignTerminalforWorKitem(workItemId: string): Observable<any>{
    return this.http.post<String>(this.FTR_WORK_ITEMS_URL + "/managed-terminal/" + workItemId, null).pipe(
      tap(data=>console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  allocateVehicleforWorKitem(workItemId: string): Observable<any>{
    return this.http.post<String>(this.FTR_WORK_ITEMS_URL + "/managed-vehicle/" + workItemId, null).pipe(
      tap(data=>console.log(JSON.stringify(data))),
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








