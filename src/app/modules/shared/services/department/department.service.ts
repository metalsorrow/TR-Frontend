import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Department } from '../../interface/department';
import base64 from '../../../../../assets/base64.json';

export enum DepartmentRoutes {
  GET_DEPARTMENT = '/api/departments',
  GET_DEPARTMENT_DISPONIBILITY = '/api/departmentByDisponibility',
  GET_DEPARTMENT_BY_ID = '/api/departmentById',
  POST_DEPARTMENT = '/api/departments',
  DELETE_DEPARTMENT = '/api/departments',
  PUT_DISPONIBILITY = '/api/updateDisponibility',
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
              departmentImage: base64.file,
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

  getDepartmentsDisponibility(){
  const headers = new HttpHeaders().append('Content-Type', 'application/json');
  const params = new HttpParams().append('disponibility', 1);
  return this.http.get<Department[]>(DepartmentRoutes.GET_DEPARTMENT_DISPONIBILITY,{headers: headers, params: params} ).pipe(
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
            departmentImage: base64.file,
            furnished: Number(data.furnished),
            departmentPrice: Number(data.departmentPrice),
            departmentStatus: Number(data.departmentStatus),
            departmentDesc: data.description,
            ubicacion: data.ubicacion
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

  getDepartmentsbyId(id: number): Observable<any> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const params = new HttpParams().append('id', id);

    return this.http.get<Department[]>(DepartmentRoutes.GET_DEPARTMENT_BY_ID, {headers: headers, params: params}
      ).pipe(
      map((response: any) => {
        if (response) {
          console.log(response);
          let responseFormated = response.department.map((data: any) => {
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
              departmentDesc: data.description,
              idCommune: data.idCommune,
              nameCommune: data.nameCommune
            } as Department
            return json
          });

          return responseFormated[0];
        }
        throw new Error('Error from api');
      }),
      catchError(error => error),
    );
  }

  deleteDepartments(id: number): Observable<any> {
    return this.http.delete<{ok: string}>(DepartmentRoutes.DELETE_DEPARTMENT, {
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


  changeDisponibility(id: number){
    return this.http.put<{ ok: string }>(DepartmentRoutes.PUT_DISPONIBILITY, {id: id}).pipe(
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
