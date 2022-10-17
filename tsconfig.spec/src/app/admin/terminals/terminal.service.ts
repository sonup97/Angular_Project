import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Terminal } from '../models/Terminal';

@Injectable({
  providedIn: 'root'
})
export class TerminalsService {

  terminalUrl = "http://localhost:9000/ftr/terminals";

  constructor(private http: HttpClient) { }

  getAllTerminals(): Observable<Terminal[]> {
    return this.http.get<Terminal[]>(this.terminalUrl).pipe(
      tap(data => console.log('Data Fetched:' + JSON.stringify(data))),
      catchError(this.handleError));
  }

  getTerminalsByTerminalId(terminalId: number): Observable<Terminal> {
    return this.http.get<Terminal>(this.terminalUrl + "/fetchTerminalByTerminalId/" + terminalId).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getTerminalsByItemType(itemType: string): Observable<Terminal[]> {
    return this.http.get<Terminal[]>(this.terminalUrl + "/fetchTerminalByItemType/" + itemType).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteTerminal(terminalId: string): Observable<any> {
    return this.http.delete<any>(this.terminalUrl + "/" + terminalId).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError));
  }

  updateTerminal(terminalId: string, newCapacity: number) {
    const options = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.terminalUrl + "/" + terminalId + "/" + newCapacity, {responseType: 'text'});
  }

  insertNewTerminal(terminal: Terminal){
    const options = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post(this.terminalUrl, terminal,{responseType: 'text'});
  }

  private handleError(err: HttpErrorResponse) {
    let errMsg: string = '';
    console.log(err);
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', err.error.message);
      errMsg = err.error.message;
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(`Backend returned code ${err.status}`);
      console.log(err.error.message)
      errMsg = err.error.message;
    }
    return throwError(errMsg);
  }
}
