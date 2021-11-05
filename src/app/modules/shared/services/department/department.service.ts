import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Department } from '../../interface/department';

export enum DepartmentRoutes {
  GET_DEPARTMENT = '/api/departments',
  POST_DEPARTMENT = '/api/departments',
  DELETE_DEPARTMENT = '/api/departments',
}


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  createDepartment(department: Department): Observable<any> {
    return this.http.post<{ ok: string }>(DepartmentRoutes.POST_DEPARTMENT, department).pipe(
      map((response: any) => {
        if (response) {
          return response
        }
        throw new Error('Error from api');
      }),
      catchError(error => error),
    );
  }

  updateDepartment(department: Department): Observable<any> {
    return this.http.put<{ ok: string }>(DepartmentRoutes.POST_DEPARTMENT, department).pipe(
      map((response: any) => {
        if (response) {
          return response
        }
        throw new Error('Error from api');
      }),
      catchError(error => error),
    );
  }

  getDepartments(): Observable<any> {
    return this.http.get<Department[]>(DepartmentRoutes.GET_DEPARTMENT).pipe(
      map((response: any) => {
        if (response) {
          let responseFormated = response.departments.map((data: any) => {
            let json = {
              id: Number(data.id),
              name: data.name,
              address: data.address,
              totalRooms: Number(data.totalRooms),
              totalParking: Number(data.totalParking),
              totalBaths: Number(data.totalBaths),
              internet: Number(data.internet),
              tv: Number(data.tv),
              heating: Number(data.heating),
              furnished: Number(data.furnished),
              departmentPrice: Number(data.departmentPrice),
              departmentStatus: Number(data.departmentStatus),
              departmentDesc: data.departmentDesc,
              idCommune: data.idCommune,
              nameCommune: data.nameCommune
            } as Department
            return json
          });

          return responseFormated;
        }
        throw new Error('Error from api');
      }),
      catchError(error => error),
    );
  }

  deleteDepartments(id: number): Observable<any> {
    return this.http.delete<Department[]>(DepartmentRoutes.DELETE_DEPARTMENT, {
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
