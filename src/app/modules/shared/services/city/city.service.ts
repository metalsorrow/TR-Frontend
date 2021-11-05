import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { City } from '../../interface/ubication';

export enum CitiesRoutes {
  GET_CITIES = '/api/cities',
}

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  getCities(): Observable<any> {
    return this.http.get<City[]>(CitiesRoutes.GET_CITIES, {}).pipe(
        map((response: any) => {
            if (response) {
                let responseFormated = response.cities.map((data: any) => {
                    let json = { id: Number(data.id), name: data.name } as City
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
