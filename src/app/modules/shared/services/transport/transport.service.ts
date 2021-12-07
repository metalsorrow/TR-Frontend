import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TransportDisplay, TransportDTO } from '../../interface/transport';

export enum TransportRoutes {
  GET_TRANSPORT = "/api/transport",
  POST_TRANSPORT = "/api/transport",
  PUT_TRANSPORT = "/api/transport",
  DELETE_TRANSPORT = "/api/transport",
}

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  constructor(private http: HttpClient) { }

  
  getTransport(): Observable<any> {
    return this.http.get<TransportDisplay[]>(TransportRoutes.GET_TRANSPORT).pipe(
      map((response: any) => {
        if (response) {
          let responseFormated = response.transports.map((data: any) => {
            let json = {
              id: Number(data.id),
              idBooking: Number(data.idReserve),
              client: data.clientName,
              worker: data.workerName,
              vehicle: data.vehicle,
              init: data.tripStart,
              end: data.tripEnd,
              schedule: data.time,
            } as TransportDisplay
            return json
          });

          return responseFormated;
        }
        throw new Error('Error from api');
      }),
      catchError(error => error),
    );
  }

  createTransport( transport: TransportDTO){
    return this.http.post<{ ok: string }>(TransportRoutes.POST_TRANSPORT, transport).pipe(
      map((response: any) => {
        if (response) {
          return response
        }
        throw new Error('Error from api');
      }),
      catchError(error => error),
    );
  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
  updateTransport( transport: TransportDTO){
    return this.http.put<{ ok: string }>(TransportRoutes.PUT_TRANSPORT, transport).pipe(
      map((response: any) => {
        if (response) {
          return response
        }
        throw new Error('Error from api');
      }),
      catchError(error => error),
    );
  }

  deleteDepartments(id: number): Observable<any> {
    return this.http.delete<{ok: string}>(TransportRoutes.DELETE_TRANSPORT, {
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
