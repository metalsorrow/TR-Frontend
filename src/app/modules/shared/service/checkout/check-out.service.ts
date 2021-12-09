import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CheckOut } from '../../interface/checkout';

export enum checkoutRoutes {
  GET_CHECKOUT = "/api/getCheckout",
  PUT_CHECKOUT = "/api/getCheckout"
}

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {

  constructor(private http: HttpClient) { }


  getCheckout(id: number): Observable<any> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const params = new HttpParams().append('id', id);
    return this.http.get<CheckOut>(checkoutRoutes.GET_CHECKOUT,{ headers, params}).pipe(
      map((response: any) => {
        console.log(response);
        if (response) {
            let json: CheckOut = {
              multaList: response.fines,
              extraServicesList: response.servex,
              totalMulta: response.fines.reduce( (count: number, current: any) => { return current.subTotal + count},0),
              totalExtraServices: response.servex.reduce( (count: number, current: any) => {return current.subTotal + count},0),
              idBooking: response.reserve[0].id, 
              checkin: response.reserve[0].checkIn, 
              checkout: response.reserve[0].checkOut, 
              totalBooking: response.reserve[0].totalReserve,
            };
          return json;
        }
        throw new Error('Error from api');
      }),
      catchError(error => error),
    );
  }

  generateCheckout(id: number): Observable<any> {
    return this.http.put<{ ok: string }>(checkoutRoutes.PUT_CHECKOUT, {id: id}).pipe(
      map((response: any) => {
        if (response) {
          return response
        }
        throw new Error('Error from api');
      }),
      catchError(error => error),
    );
  }

  
}
