import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Maintenance } from '../../interface/maintenance';

export enum MaintenanceRoutes {
  GET_MAINTENANCE = "/api/acta"
}

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(private http: HttpClient) { }

  getmaintenance(){
    return this.http.get<Maintenance[]>(MaintenanceRoutes.GET_MAINTENANCE).pipe(
      map((response: any) => {
        if (response) {
          let responseFormated = response.actas.map((data: any) => {
            let json = {
              id: Number(data.id),
              fineName: data.fineName,
              fineDesc: data.fineDesc,
              price: Number(data.price)
            } as Maintenance
            return json
          });

          return responseFormated;
        }
        throw new Error('Error from api');
      }),
      catchError(error => error),
    );
  }

}
