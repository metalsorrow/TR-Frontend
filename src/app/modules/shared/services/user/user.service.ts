import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { User } from '../../interface/user';

export enum UserRoutes {
    GET_USERS = "/api/users",
    POST_USERS = "/api/users",
    DELETE_USERS = "/api/users",
    UPDATE_USERS = "/api/users",
    LOGIN_USER = "/api/validateLogin"
}

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient
    ) { }

    getUsers() {
        return this.http.get<User[]>(UserRoutes.GET_USERS).pipe(
            map((response: any) => {
                if (response) {
                    console.log(response, 'getUser');
                    let responseFormated = response.users.map((data: any) => {
                        let json = {
                            id: Number(data.id),
                            firstName: data.firstName,
                            lastNameP: data.lastNameP,
                            lastNameM: data.lastNameM,
                            dateOfBirth: data.dateOfBirth,
                            mail: data.mail,
                            phone: data.phone,
                            pass: data.pass,
                            idCommune: Number(data.idCommune),
                            nameCommune: data.nameCommune,
                            idType: Number(data.idType),
                            userType: data.nameType,
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

    createUser(newUser: User) {
        return this.http.post<{ ok: string }>(UserRoutes.POST_USERS, newUser).pipe(
            map((response: any) => {
                return response
            }),
            catchError(error => error),
        );
    }

    updateUser(user: User) {
        return this.http.put<{ ok: string }>(UserRoutes.UPDATE_USERS, user).pipe(
            map((response: any) => {
                return response
            }),
            catchError(error => error),
        );
    }

    deleteUser(id: Number) {
        return this.http.delete<{ ok: string }>(UserRoutes.DELETE_USERS, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: {
                id: id
            }
        }).pipe(
            map((response: any) => {
                return response
            }),
            catchError(error => error),
        );
    }

    loginUser(mail: string, pass:string ) {
        return this.http.post<User[]>(UserRoutes.LOGIN_USER, {mail: mail, password: pass}).pipe(
            map((response: any) => {
                return response.user
            }),
            catchError(error => error),
        );
    }
}
