import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Order } from '../../interface/order';


export enum OrderRoutes {
  GET_ORDER = "/api/getOrderByUser",
  GENERATE_PAY = "/api/pago"
}
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getCheckoutByUser(id: number){
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const params = new HttpParams().append('id', id);
    return this.http.get<Order[]>(OrderRoutes.GET_ORDER,{headers: headers, params: params} ).pipe(
      map((response: any) => {
        if (response) {
          let responseFormated = response.order.map((data: any) => {
            let json: Order = {
              id: Number(data.id),
              date: data.FECHA_REGISTRO,
              estado: data.ESTADO,
              idBooking: data.ID_RESERVA,
              totalPrice: data.TOTAL_PAGO
            }
            return json
          });
  
          return responseFormated;
        }
        throw new Error('Error from api');
      }),
      catchError(error => error),
    );
  }

  generatePay(id: number): Observable<any>{
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const params = new HttpParams().append('id', id);
    return this.http.get<{url: string, token: string}>(OrderRoutes.GENERATE_PAY,{headers: headers, params: params} ).pipe(
      map((response: any) => {
        if (response) {

          return {token: response.token, url: response.url};
        }
        throw new Error('Error from api');
      }),
      catchError(error => error),
    );
  }
}
