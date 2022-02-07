import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BeginningWareHouse } from '../entity/BeginningWareHouse';
import { BeginningWareHouseDTO } from '../model/BeginningWareHouseDTO';
import { BeginningWareHouseSearchModel } from '../model/BeginningWareHouseSearchModel';
import { ResultMessageResponse } from '../model/ResultMessageResponse';
import { WareHouseItemDTO } from '../model/WareHouseItemDTO';
import { WareHouseSearchModel } from '../model/WareHouseSearchModel';

@Injectable({
  providedIn: 'root'
})
export class BeginningWareHouseService {
  private baseUrl = environment.baseApi+'BeginningWareHouse';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }


  getById(id:string): Observable<ResultMessageResponse<BeginningWareHouseDTO>> {
    var url = this.baseUrl + `/get-list?`;
    return this.http.get<ResultMessageResponse<BeginningWareHouseDTO>>(url, this.httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }


  getList(search: BeginningWareHouseSearchModel): Observable<ResultMessageResponse<BeginningWareHouseDTO>> {
    var check = search.active == null ? '' : search.active;
    var url = this.baseUrl + `/get-list?KeySearch=` + search.keySearch + `&Active=` + check + `&Skip=` + search.skip + `&Take=` + search.take + ``;
    return this.http.get<ResultMessageResponse<BeginningWareHouseDTO>>(url, this.httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }
  getListDropDown(): Observable<ResultMessageResponse<BeginningWareHouseDTO>> {
    var url = this.baseUrl + `/get-drop-tree?Active=true`;
    return this.http.get<ResultMessageResponse<BeginningWareHouseDTO>>(url, this.httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  Edit(model: BeginningWareHouse): Observable<ResultMessageResponse<BeginningWareHouse>> {
    var url = this.baseUrl + `/edit`;
    return this.http.post<ResultMessageResponse<BeginningWareHouse>>(url, model, this.httpOptions).pipe(
      tap(_ => console.log(`edit WareHouses id=${model.id}`)),
      catchError(this.handleError) // then handle the error
    );
  }

  EditIndex(id:string): Observable<ResultMessageResponse<BeginningWareHouseDTO>> {
    var url = this.baseUrl + `/edit?id=`+id;
    return this.http.get<ResultMessageResponse<BeginningWareHouseDTO>>(url, this.httpOptions).pipe(
      tap(_ => console.log(`edit`)),
      catchError(this.handleError) // then handle the error
    );
  }
  AddIndex(): Observable<ResultMessageResponse<BeginningWareHouse>> {
    var url = this.baseUrl + `/create`;
    return this.http.get<ResultMessageResponse<BeginningWareHouse>>(url, this.httpOptions).pipe(
      tap(_ => console.log(`create`)),
      catchError(this.handleError) // then handle the error
    );
  }
  Add(model: BeginningWareHouse): Observable<ResultMessageResponse<BeginningWareHouse>> {
    var url = this.baseUrl + `/create`;
    return this.http.post<ResultMessageResponse<BeginningWareHouse>>(url, model, this.httpOptions).pipe(
      tap(_ => console.log(`create  id=${model.id}`)),
      catchError(this.handleError) // then handle the error
    );
  }

 Delete(ids:string[]): Observable<ResultMessageResponse<BeginningWareHouse>> {
    var url = this.baseUrl + `/delete`;
    return this.http.post<ResultMessageResponse<BeginningWareHouse>>(url, ids, this.httpOptions).pipe(
      tap(_ => console.log(`delete  id=${ids}`)),
      catchError(this.handleError) // then handle the error
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}