import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Reservex, Servex } from '../../interface/reservex';

export enum ServexRoutes {
  CREATE_RESERVEX = "/api/reserveServex",
  DELETE_RESERVEX = "/api/reserveServex",
  GET_RESERVEX = "/api/reserveServex",
  GET_SERVEX = "/api/extraServices",
}

@Injectable({
  providedIn: 'root'
})
export class ServexService {

  constructor(private http: HttpClient) { }

  getServex(){
    return this.http.get<Servex[]>(ServexRoutes.GET_SERVEX).pipe(
      map((response: any) => {
        if (response) {
          let responseFormated = response.servicios.map((data: any) => {
            let json = {
              id: Number(data.id),
              description: data.description,
              price: Number(data.price),
            } as Servex
            return json
          });
          return responseFormated;
        }
        throw new Error('Error from api');
      }),
      catchError(error => error),
    );
  }

  getReservex(id: number){
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const params = new HttpParams().append('id', id);

    return this.http.get<Reservex[]>(ServexRoutes.GET_RESERVEX, {headers: headers, params: params}
      ).pipe(
      map((response: any) => {
        console.log(response);
        if (response) {
          let responseFormated = response.services.map((data: any) => {
            let json = {
              id: Number(data.id),
              quantity: data.quantity,
              subtotal: Number(data.subTotal),
              servex: data.desc_serv
            } as Reservex
            return json
          });

          return responseFormated;
        }
        throw new Error('Error from api');
      }),
      catchError(error => error),
    );
  }

  deleteReservex(id: number){
    return this.http.delete<{ok: string}>(ServexRoutes.DELETE_RESERVEX, {
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

  createReservex(reservex: Reservex){
    return this.http.post<{ ok: string }>(ServexRoutes.CREATE_RESERVEX, 
      {
        cantidad: reservex.quantity, 
        subtotal: reservex.subtotal,
        serv_id: reservex.servexId,
        reserv_id: reservex.bookingId
      }
      ).pipe(
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
