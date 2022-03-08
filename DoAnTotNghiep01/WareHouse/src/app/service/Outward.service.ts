import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Outward } from '../entity/Outward';
import { OutwardDTO } from '../model/OutwardDTO';
import { ResultDataResponse } from '../model/ResultDataResponse';
import { ResultMessageResponse } from '../model/ResultMessageResponse';

@Injectable({
  providedIn: 'root'
})
export class OutwardService {
  private baseUrl = environment.baseApi+'Outward';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }


  getById(id:string): Observable<ResultMessageResponse<OutwardDTO>> {
    var url = this.baseUrl + `/get-list?`;
    return this.http.get<ResultMessageResponse<OutwardDTO>>(url, this.httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }



  Edit(model: Outward): Observable<ResultMessageResponse<Outward>> {
    var url = this.baseUrl + `/edit`;
    return this.http.post<ResultMessageResponse<Outward>>(url, model, this.httpOptions).pipe(
      tap(_ => console.log(`edit WareHouses id=${model.id}`)),
      catchError(this.handleError) // then handle the error
    );
  }

  EditIndex(id:string): Observable<ResultMessageResponse<OutwardDTO>> {
    var url = this.baseUrl + `/edit?id=`+id;
    return this.http.get<ResultMessageResponse<OutwardDTO>>(url, this.httpOptions).pipe(
      tap(_ => console.log(`edit`)),
      catchError(this.handleError) // then handle the error
    );
  }
  AddIndex(idwh:string|null): Observable<ResultDataResponse<OutwardDTO>> {
    var url = this.baseUrl + `/create?idWareHouse=`+idwh;
    return this.http.get<ResultDataResponse<OutwardDTO>>(url, this.httpOptions).pipe(
      tap(_ => console.log(`create`)),
      catchError(this.handleError) // then handle the error
    );
  }
  Add(model: Outward): Observable<ResultMessageResponse<Outward>> {
    var url = this.baseUrl + `/create`;
    return this.http.post<ResultMessageResponse<Outward>>(url, model, this.httpOptions).pipe(
      tap(_ => console.log(`create  id=${model.id}`)),
      catchError(this.handleError) // then handle the error
    );
  }

 Delete(ids:string[]): Observable<ResultMessageResponse<Outward>> {
    var url = this.baseUrl + `/delete`;
    return this.http.post<ResultMessageResponse<Outward>>(url, ids, this.httpOptions).pipe(
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