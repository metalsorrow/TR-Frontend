import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TypeUser } from '../../interface/user';

export enum TypeUserRoutes {
  GET_TYPE_USER = "/api/typeUser"
}

@Injectable({
  providedIn: 'root'
})
export class TypeUserService {



  constructor( private http: HttpClient) {
    
   }

  getTypeUser(): Observable<any>{
      return this.http.get<TypeUser[]>(TypeUserRoutes.GET_TYPE_USER, {}).pipe(
          map((response: any) => {
              if (response) {
                console.log(response);
                  let responseFormated = response.typeUsers.map((data: any) => {
                      let formatedResponse: TypeUser = { id: Number(data.id), name: data.name } 
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
