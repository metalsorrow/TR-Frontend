import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { User } from '../../interface/user';

export enum UserRoutes {
  GET_USERS = "/api/users"
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(){
    return this.http.get<User[]>(UserRoutes.GET_USERS).pipe(
      map((response: any) => {
        if (response) {
          let responseFormated = response.users.map((data: any) => {
            let json = {
              id: Number(data.id),
              firstName: data.firstName,
              lastNameP: data.lastNameP,
              dateOfBirth: data.dateOfBirth,
              mail: data.mail,
              phone: data.phone,
              pass: data.pass,
              idCommune: Number(data.idCommune),
              nameCommune: data.nameCommune,
              idType: Number(data.idType),
              nameType: data.nameType,
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
}
