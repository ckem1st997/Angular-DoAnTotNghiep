import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WareHouseItemCategory } from '../entity/WareHouseItemCategory';
import { ResultMessageResponse } from '../model/ResultMessageResponse';
import { TreeView } from '../model/TreeView';
import { WareHouseItemCategoryDTO } from '../model/WareHouseItemCategoryDTO';
import { WareHouseItemCategorySearchModel } from '../model/WareHouseItemCategorySearchModel';

@Injectable({
  providedIn: 'root'
})
export class WareHouseItemCategoryService {
  private baseUrl = environment.baseApi+'WareHouseItemCategory';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }


  getById(id:string): Observable<ResultMessageResponse<WareHouseItemCategoryDTO>> {
    var url = this.baseUrl + `/get-list?`;
    return this.http.get<ResultMessageResponse<WareHouseItemCategoryDTO>>(url, this.httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  getList(search: WareHouseItemCategorySearchModel): Observable<ResultMessageResponse<WareHouseItemCategoryDTO>> {
    var check = search.active == null ? '' : search.active;
    var url = this.baseUrl + `/get-list?KeySearch=` + search.keySearch + `&Active=` + check + `&Skip=` + search.skip + `&Take=` + search.take + ``;
    return this.http.get<ResultMessageResponse<WareHouseItemCategoryDTO>>(url, this.httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }
  getListDropDown(): Observable<ResultMessageResponse<WareHouseItemCategoryDTO>> {
    var url = this.baseUrl + `/get-drop-tree?Active=true`;
    return this.http.get<ResultMessageResponse<WareHouseItemCategoryDTO>>(url, this.httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  Edit(model: WareHouseItemCategory): Observable<ResultMessageResponse<WareHouseItemCategory>> {
    var url = this.baseUrl + `/edit`;
    return this.http.post<ResultMessageResponse<WareHouseItemCategory>>(url, model, this.httpOptions).pipe(
      tap(_ => console.log(`edit WareHouses id=${model.id}`)),
      catchError(this.handleError) // then handle the error
    );
  }

  Add(model: WareHouseItemCategory): Observable<ResultMessageResponse<WareHouseItemCategory>> {
    var url = this.baseUrl + `/create`;
    return this.http.post<ResultMessageResponse<WareHouseItemCategory>>(url, model, this.httpOptions).pipe(
      tap(_ => console.log(`create vendor id=${model.id}`)),
      catchError(this.handleError) // then handle the error
    );
  }

 Delete(ids:string[]): Observable<ResultMessageResponse<WareHouseItemCategory>> {
    var url = this.baseUrl + `/delete`;
    return this.http.post<ResultMessageResponse<WareHouseItemCategory>>(url, ids, this.httpOptions).pipe(
      tap(_ => console.log(`delete vendor id=${ids}`)),
      catchError(this.handleError) // then handle the error
    );
  }

  getTreeView(): Observable<ResultMessageResponse<TreeView>> {

    var url = this.baseUrl + `/get-tree-view?Active=true`;
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
    return throwError(
      'Something bad happened; please try again later.');
  }
}