import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WareHouseItem } from '../entity/WareHouseItem';
import { BaseSearchModel } from '../model/BaseSearchModel';
import { ResultMessageResponse } from '../model/ResultMessageResponse';
import { WareHouseDTO } from '../model/WareHouseDTO';
import { WareHouseItemDTO } from '../model/WareHouseItemDTO';
import { WareHouseItemUnitDTO } from '../model/WareHouseItemUnitDTO';
import { WareHouseSearchModel } from '../model/WareHouseSearchModel';

@Injectable({
  providedIn: 'root'
})
export class WareHouseItemService {
  private baseUrl = environment.baseApi+'WareHouseItem';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }


  getById(id:string): Observable<ResultMessageResponse<WareHouseItemDTO>> {
    var url = this.baseUrl + `/get-list?`;
    return this.http.get<ResultMessageResponse<WareHouseItemDTO>>(url, this.httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  getListItemUnit(id:string): Observable<ResultMessageResponse<WareHouseItemUnitDTO>> {
    var urlGet=environment.baseApi+'WareHouseItemUnit'
    var url =urlGet + `/get-list?idItem=`+id;
    return this.http.get<ResultMessageResponse<WareHouseItemUnitDTO>>(url, this.httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  getList(search: WareHouseSearchModel): Observable<ResultMessageResponse<WareHouseItemDTO>> {
    var check = search.active == null ? '' : search.active;
    var url = this.baseUrl + `/get-list?KeySearch=` + search.keySearch + `&Active=` + check + `&Skip=` + search.skip + `&Take=` + search.take + ``;
    return this.http.get<ResultMessageResponse<WareHouseItemDTO>>(url, this.httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }
  getListDropDown(): Observable<ResultMessageResponse<WareHouseItemDTO>> {
    var url = this.baseUrl + `/get-drop-tree?Active=true`;
    return this.http.get<ResultMessageResponse<WareHouseItemDTO>>(url, this.httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  Edit(model: WareHouseItem): Observable<ResultMessageResponse<WareHouseItem>> {
    var url = this.baseUrl + `/edit`;
    return this.http.post<ResultMessageResponse<WareHouseItem>>(url, model, this.httpOptions).pipe(
      tap(_ => console.log(`edit WareHouses id=${model.id}`)),
      catchError(this.handleError) // then handle the error
    );
  }

  EditIndex(id:string): Observable<ResultMessageResponse<WareHouseItemDTO>> {
    var url = this.baseUrl + `/edit?id=`+id;
    return this.http.get<ResultMessageResponse<WareHouseItemDTO>>(url, this.httpOptions).pipe(
      tap(_ => console.log(`edit`)),
      catchError(this.handleError) // then handle the error
    );
  }
  AddIndex(): Observable<ResultMessageResponse<WareHouseItemDTO>> {
    var url = this.baseUrl + `/create`;
    return this.http.get<ResultMessageResponse<WareHouseItemDTO>>(url, this.httpOptions).pipe(
      tap(_ => console.log(`create`)),
      catchError(this.handleError) // then handle the error
    );
  }
  Add(model: WareHouseItem): Observable<ResultMessageResponse<WareHouseItem>> {
    var url = this.baseUrl + `/create`;
    return this.http.post<ResultMessageResponse<WareHouseItem>>(url, model, this.httpOptions).pipe(
      tap(_ => console.log(`create  id=${model.id}`)),
      catchError(this.handleError) // then handle the error
    );
  }

 Delete(ids:string[]): Observable<ResultMessageResponse<WareHouseItem>> {
    var url = this.baseUrl + `/delete`;
    return this.http.post<ResultMessageResponse<WareHouseItem>>(url, ids, this.httpOptions).pipe(
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