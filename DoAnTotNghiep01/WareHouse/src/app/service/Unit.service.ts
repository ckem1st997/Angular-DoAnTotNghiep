import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, retry, tap } from 'rxjs/operators';
import { ResultMessageResponse } from '../model/ResultMessageResponse';
import { environment } from './../../environments/environment';
import { TreeView } from '../model/TreeView';
import { UnitDTO } from '../model/UnitDTO';
import { Unit } from '../entity/Unit';
import { UnitSearchModel } from '../model/UnitSearchModel';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private baseUrl = environment.baseApi+'Unit';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  getById(id:string): Observable<ResultMessageResponse<UnitDTO>> {
    var url = this.baseUrl + `/get-list?`;
    return this.http.get<ResultMessageResponse<UnitDTO>>(url, this.httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  getList(search: UnitSearchModel): Observable<ResultMessageResponse<UnitDTO>> {
    var check = search.active == null ? '' : search.active;
    var url = this.baseUrl + `/get-list?KeySearch=` + search.keySearch + `&Active=` + check + `&Skip=` + search.skip + `&Take=` + search.take + ``;
    return this.http.get<ResultMessageResponse<UnitDTO>>(url, this.httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }
  getListDropDown(): Observable<ResultMessageResponse<UnitDTO>> {
    var url = this.baseUrl + `/get-drop-tree?Active=true`;
    return this.http.get<ResultMessageResponse<UnitDTO>>(url, this.httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  Edit(model: Unit): Observable<ResultMessageResponse<Unit>> {
    var url = this.baseUrl + `/edit`;
    return this.http.post<ResultMessageResponse<Unit>>(url, model, this.httpOptions).pipe(
      tap(_ => console.log(`edit id=${model.id}`)),
      catchError(this.handleError) // then handle the error
    );
  }

  Add(model: Unit): Observable<ResultMessageResponse<Unit>> {
    var url = this.baseUrl + `/create`;
    return this.http.post<ResultMessageResponse<Unit>>(url, model, this.httpOptions).pipe(
      tap(_ => console.log(`create id=${model.id}`)),
      catchError(this.handleError) // then handle the error
    );
  }

 Delete(ids:string[]): Observable<ResultMessageResponse<Unit>> {
    var url = this.baseUrl + `/delete`;
    return this.http.post<ResultMessageResponse<Unit>>(url, ids, this.httpOptions).pipe(
      tap(_ => console.log(`delete id=${ids}`)),
      catchError(this.handleError) // then handle the error
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}