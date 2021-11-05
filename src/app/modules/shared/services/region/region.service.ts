import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Region } from '../../interface/ubication';

export enum RegionRoutes {
    GET_REGIONS = '/api/regions',
}

@Injectable({
    providedIn: 'root'
})
export class RegionService {

    constructor(private http: HttpClient) { }

    getRegions(): Observable<any> {
        return this.http.get<Region[]>(RegionRoutes.GET_REGIONS, {}).pipe(
            map((response: any) => {
                if (response) {
                    let responseFormated = response.regions.map((data: any) => {
                        let json = { id: Number(data.id), name: data.name } as Region
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
