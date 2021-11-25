import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { MaintenanceRelation } from '../../interface/maintenance';

export enum MaintenanceDepartmentRoutes {
  GET_MAINTENANCE_DEPARTMENTS = "/api/maintainsDepartmentsById",
  POST_MAINTENANCE_DEPARTMENTS = "/api/maintainsDepartments"
}

@Injectable({
  providedIn: 'root'
})
export class MaintenanceDepartmentService {

  constructor(private http: HttpClient) { }

  getMaintenanceDepartment(id: number) {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const params = new HttpParams().append('id', id);
    return this.http.get<MaintenanceRelation[]>(MaintenanceDepartmentRoutes.GET_MAINTENANCE_DEPARTMENTS, {headers: headers, params: params}).pipe(
        map((response: any) => {
            if (response) {
                let responseFormated = response.maintainsDepartments.map((data: any) => {
                    let json: MaintenanceRelation = {
                        id: Number(data.id),
                        initDate: data.initDate,
                        finishDate: data.finishDate,
                        userName: data.userName,
                        userId: Number(data.userId),
                        departmentId: Number(data.departmentId)
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

  createMainenance(newMainenance: {initDate: string, finishDate: string, userId: number, departmentId: number}){
    return this.http.post<{ ok: string }>(MaintenanceDepartmentRoutes.POST_MAINTENANCE_DEPARTMENTS, newMainenance).pipe(
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
