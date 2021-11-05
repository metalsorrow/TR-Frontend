import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Inventory } from '../../interface/inventory';

export enum InventoryRoutes {
  GET_INVENTORY = "/api/inventories",
}


@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor( private http: HttpClient) { }


  getInventory(){
    return this.http.get<{ ok: string }>(InventoryRoutes.GET_INVENTORY, {}).pipe(
      map((response: any) => {
        if (response) {
          let responseFormated = response.inventories.map((data: any) => {
            let json = {
              id: data.id,
              description: data.description,
              name: data.name
            } as Inventory
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
