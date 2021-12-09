import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Fine, FinesType } from '../../interface/fine';


export enum FinesRoutes{
  GET_FINES = "/api/multa",
  GET_FINES_TYPES = "/api/acta",
  DELETE_FINES = "/api/multa",
  CREATE_FINES = "/api/multa",
}
@Injectable({
  providedIn: 'root'
})
export class FinesService {

  constructor(private http: HttpClient) { }

  createFines(fines: Fine): Observable<any> {
    return this.http.post<{ ok: string }>(FinesRoutes.CREATE_FINES, {
      quantity: fines.quantity,
      subTotal: fines.totalPrice,
      idActa: fines.fineTypeId,
      idReserve: fines.bookingId
    }).pipe(
      map((response: any) => {
        if (response) {
          return response
        }
        throw new Error('Error from api');
      }),
      catchError(error => error),
    );
  }

  getFines(id: number): Observable<any> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const params = new HttpParams().append('id', id);
    
    return this.http.get<Fine[]>(FinesRoutes.GET_FINES, {headers, params}).pipe(
      map((response: any) => {
        if (response) {
          let responseFormated = response.fines.map((data: any) => {
            let json = {
              id: Number(data.id),
              name: data.fineName,
              totalPrice: Number(data.subTotal),
            } as Fine
            return json
          });

          return responseFormated;
        }
        throw new Error('Error from api');
      }),
      catchError(error => error),
    );
  }

  getFinesTypes(): Observable<any> {
    return this.http.get<Fine[]>(FinesRoutes.GET_FINES_TYPES).pipe(
      map((response: any) => {
        if (response) {
          let responseFormated = response.actas.map((data: any) => {
            let json = {
              id: Number(data.id),
              name: data.fineName,
              price: Number(data.price),
            } as FinesType
            return json
          });

          return responseFormated;
        }
        throw new Error('Error from api');
      }),
      catchError(error => error),
    );
  }

  deleteFines(id: number): Observable<any> {
    return this.http.delete<{ok: string}>(FinesRoutes.DELETE_FINES, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: id
      }
    }
    ).pipe(
      map((response: any) => {
        return response
      }),
      catchError(error => error),
    );
  }

}
