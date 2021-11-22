import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Maintenance } from '../../interface/maintenance';

export enum MaintenanceRoutes {
  GET_MAINTENANCE = "/api/acta",
  POST_MAINTENANCE = "/api/maintainsDepartmentsById",
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

  createMainenance(newMainenance: {initDate: string, finishDate: string, userId: number, departmentId: number}){
    return this.http.post<{ ok: string }>(MaintenanceRoutes.POST_MAINTENANCE, newMainenance).pipe(
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
