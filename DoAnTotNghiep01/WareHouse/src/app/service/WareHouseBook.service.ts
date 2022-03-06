import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WareHouseLimit } from '../entity/WareHouseLimit';
import { InwardDetailDTO } from '../model/InwardDetailDTO';
import { ResultDataResponse } from '../model/ResultDataResponse';
import { ResultMessageResponse } from '../model/ResultMessageResponse';
import { UnitDTO } from '../model/UnitDTO';
import { WareHouseBookSearchModel } from '../model/WareHouseBookSearchModel';
import { WareHouseBookDTO } from './../model/WareHouseBookDTO';

@Injectable({
  providedIn: 'root'
})
export class WareHouseBookService {
  private baseUrl = environment.baseApi + 'WareHouseBook';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }


  // getById(id:string): Observable<ResultMessageResponse<WareHouseLimitDTO>> {
  //   var url = this.baseUrl + `/get-list?`;
  //   return this.http.get<ResultMessageResponse<WareHouseLimitDTO>>(url, this.httpOptions).pipe(
  //     retry(3), // retry a failed request up to 3 times
  //     catchError(this.handleError) // then handle the error
  //   );
  // }


  getList(search: WareHouseBookSearchModel): Observable<ResultMessageResponse<WareHouseBookDTO>> {
    var TypeWareHouseBook = search.typeWareHouseBook == null ? '' : search.typeWareHouseBook;
    var FromDate = search.fromDate == null ? '' : search.fromDate;
    var ToDate = search.toDate == null ? '' : search.toDate;
    var wareHouseId = search.wareHouseId == null ? '' : search.wareHouseId;
    var url = this.baseUrl + `/get-list?KeySearch=` + search.keySearch + `&TypeWareHouseBook=` + TypeWareHouseBook + `&Skip=` + search.skip + `&Take=` + search.take + `&FromDate=` + FromDate + `&ToDate=` + ToDate + `&WareHouseId=` + wareHouseId + ``;
    return this.http.get<ResultMessageResponse<WareHouseBookDTO>>(url, this.httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }
  GetUnitByIdItem(id: string): Observable<ResultMessageResponse<UnitDTO>> {
    var url = this.baseUrl + `/get-unit-by-id?IdItem=`+id;
    return this.http.get<ResultMessageResponse<UnitDTO>>(url, this.httpOptions).pipe(
      tap(_ => console.log(`create`)),
      catchError(this.handleError) // then handle the error
    );
  }
  // Edit(model: WareHouseLimit): Observable<ResultMessageResponse<WareHouseLimit>> {
  //   var url = this.baseUrl + `/edit`;
  //   return this.http.post<ResultMessageResponse<WareHouseLimit>>(url, model, this.httpOptions).pipe(
  //     tap(_ => console.log(`edit WareHouses id=${model.id}`)),
  //     catchError(this.handleError) // then handle the error
  //   );
  // }

  // EditIndex(id:string): Observable<ResultMessageResponse<WareHouseLimitDTO>> {
  //   var url = this.baseUrl + `/edit?id=`+id;
  //   return this.http.get<ResultMessageResponse<WareHouseLimitDTO>>(url, this.httpOptions).pipe(
  //     tap(_ => console.log(`edit`)),
  //     catchError(this.handleError) // then handle the error
  //   );
  // }
  AddInwarDetailsIndex(): Observable<ResultDataResponse<InwardDetailDTO>> {
    var url = this.baseUrl + `/create-inward-details`;
    return this.http.get<ResultDataResponse<InwardDetailDTO>>(url, this.httpOptions).pipe(
      tap(_ => console.log(`create`)),
      catchError(this.handleError) // then handle the error
    );
  }

  // Add(model: WareHouseLimit): Observable<ResultMessageResponse<WareHouseLimit>> {
  //   var url = this.baseUrl + `/create`;
  //   return this.http.post<ResultMessageResponse<WareHouseLimit>>(url, model, this.httpOptions).pipe(
  //     tap(_ => console.log(`create  id=${model.id}`)),
  //     catchError(this.handleError) // then handle the error
  //   );
  // }

  Delete(ids: string[]): Observable<ResultMessageResponse<WareHouseLimit>> {
    var url = this.baseUrl + `/delete`;
    return this.http.post<ResultMessageResponse<WareHouseLimit>>(url, ids, this.httpOptions).pipe(
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