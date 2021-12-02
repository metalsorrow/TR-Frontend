import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { InventoryRelation } from '../../interface/inventory';

export enum InventoryDepartmentRoutes {
    GET_INVENTORY_DEPARTMENTS = "/api/inventoriesDepartmentById",
    DELETE_INVENTORY_DEPARTMENTS = "/api/inventoriesDepartment",
    CREATE_INVENTORY_DEPARTMENTS = "/api/inventoriesDepartment",
}

@Injectable({
    providedIn: 'root'
})
export class InventoryDepartmentService {

    constructor(private http: HttpClient) { }


    getInventoryDepartement(id: number) {
        const headers = new HttpHeaders().append('Content-Type', 'application/json');
        const params = new HttpParams().append('id', id);
        return this.http.get<InventoryRelation[]>(InventoryDepartmentRoutes.GET_INVENTORY_DEPARTMENTS, {headers: headers, params: params}).pipe(
            map((response: any) => {
                if (response) {
                    console.log(response);
                    let responseFormated = response.inventoriesDepartments.map((data: any) => {
                        let json = {
                            id: data.id,
                            quantity: data.quantity,
                            departmentId: data.departmentId,
                            inventoryId: data.inventoryId,
                            inventoryName: data.inventoryName,
                        } as InventoryRelation
                        return json
                    });

                    return responseFormated;
                }
                throw new Error('Error from api');
            }),
            catchError(error => error),
        );
    }

    deleteInventoryDepartement(id: number) {
        return this.http.delete<{ok: string}>(InventoryDepartmentRoutes.DELETE_INVENTORY_DEPARTMENTS,
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                }),
                body: {
                    id: id
                }
            }).pipe(
                map((response: any) => {
                    return response;
                }),
                catchError(error => error),
            );
    }

    createInventoryDepartement(InventoryRelation: InventoryRelation){
        console.log(InventoryRelation);
        return this.http.post<{ ok: string }>(InventoryDepartmentRoutes.CREATE_INVENTORY_DEPARTMENTS, InventoryRelation).pipe(
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
