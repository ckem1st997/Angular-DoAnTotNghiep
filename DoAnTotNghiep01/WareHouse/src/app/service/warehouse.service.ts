import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, retry, tap } from 'rxjs/operators';
import { VendorDTO } from './../model/VendorDTO';
import { VendorSearchModel } from './../model/VendorSearchModel';
import { BaseSearchModel } from './../model/BaseSearchModel';
import { ResultMessageResponse } from '../model/ResultMessageResponse';
import { environment } from './../../environments/environment';
import { TreeView } from '../model/TreeView';
import { WareHouseSearchModel } from '../model/WareHouseSearchModel';
import { WareHouse } from '../entity/WareHouse';
import { WareHouseDTO } from '../model/WareHouseDTO';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private baseUrl = environment.baseApi;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  private GetParams(model: BaseSearchModel): HttpParams {

    var param = new HttpParams();
    param.append("KeySearch", model.keySearch);
    if (model.active != null)
      param.append("Active", model.active);
    param.append("Skip", model.skip);
    param.append("Take", model.take);
    return param;
  }

  getById(id:string): Observable<ResultMessageResponse<WareHouseDTO>> {
    var url = this.baseUrl + `WareHouses/get-list?`;
    return this.http.get<ResultMessageResponse<WareHouseDTO>>(url, this.httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  getList(search: WareHouseSearchModel): Observable<ResultMessageResponse<WareHouseDTO>> {
    var check = search.active == null ? '' : search.active;
    var url = this.baseUrl + `WareHouses/get-list?KeySearch=` + search.keySearch + `&Active=` + check + `&Skip=` + search.skip + `&Take=` + search.take + ``;
    return this.http.get<ResultMessageResponse<WareHouseDTO>>(url, this.httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }
  getListDropDown(): Observable<ResultMessageResponse<WareHouseDTO>> {
    var url = this.baseUrl + `WareHouses/get-drop-tree?Active=true`;
    return this.http.get<ResultMessageResponse<WareHouseDTO>>(url, this.httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  Edit(model: WareHouse): Observable<ResultMessageResponse<WareHouse>> {
    var url = this.baseUrl + `WareHouses/edit`;
    return this.http.post<ResultMessageResponse<WareHouse>>(url, model, this.httpOptions).pipe(
      tap(_ => console.log(`edit WareHouses id=${model.id}`)),
      catchError(this.handleError) // then handle the error
    );
  }

  Add(model: WareHouse): Observable<ResultMessageResponse<WareHouse>> {
    var url = this.baseUrl + `WareHouses/create`;
    return this.http.post<ResultMessageResponse<WareHouse>>(url, model, this.httpOptions).pipe(
      tap(_ => console.log(`create vendor id=${model.id}`)),
      catchError(this.handleError) // then handle the error
    );
  }

 Delete(ids:string[]): Observable<ResultMessageResponse<WareHouse>> {
    var url = this.baseUrl + `WareHouses/delete`;
    return this.http.post<ResultMessageResponse<WareHouse>>(url, ids, this.httpOptions).pipe(
      tap(_ => console.log(`delete vendor id=${ids}`)),
      catchError(this.handleError) // then handle the error
    );
  }

  getTreeView(): Observable<ResultMessageResponse<TreeView>> {

    var url = this.baseUrl + `WareHouses/get-tree-view?Active=true`;
    return this.http.get<ResultMessageResponse<TreeView>>(url, this.httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) 
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