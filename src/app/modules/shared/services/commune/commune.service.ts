import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Commune } from '../../interface/ubication';

export enum CommuneRoutes {
  GET_COMMUNES = '/api/communes',
}

@Injectable({
  providedIn: 'root'
})
export class CommuneService {

  constructor(private http: HttpClient) { }

  getCommune(): Observable<any> {
      return this.http.get<Commune[]>(CommuneRoutes.GET_COMMUNES, {}).pipe(
          map((response: any) => {
              if (response) {
                  let responseFormated = response.communes.map((data: any) => {
                      let formatedResponse = { id: Number(data.id), name: data.name } as Commune
                      return formatedResponse;
                  });

                  return responseFormated;
              }

              throw new Error('Error from api');
          }),
          catchError(error => error),
      );
  }

}
