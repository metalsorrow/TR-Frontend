import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckOut } from '../../interface/checkout';

export enum checkoutRoutes {
  GET_CHECKOUT = "/api/getCheckout"
}

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {

  constructor(private http: HttpClient) { }


  getCheckout(id: number): Observable<any> {
    return this.http.get<CheckOut>(checkoutRoutes.GET_CHECKOUT).pipe(
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

  
}
