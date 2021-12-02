import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Booking, BookingDisplay, BookingDTO } from '../../interface/booking';

export enum BookingRoutes {
    GET_BOOKING_BY_CLIENT = "/api/reserve",
    GET_BOOKING = "/api/reserve",
    DELETE_BOOKING = "/api/reserve",
    PUT_BOOKING = "/api/reserve",
    POST_BOOKING = "/api/reserve",
}

@Injectable({
    providedIn: 'root'
})
export class BookingService {

    constructor(private http: HttpClient) { }


    getBooking() {
        return this.http.get<BookingDisplay[]>(BookingRoutes.GET_BOOKING_BY_CLIENT).pipe(
            map((response: any) => {
                if (response) {
                    let responseFormated = response.departments.map((data: any) => {
                        let json = {
                            id: Number(data.id),
                            planifiedCheckIn: data.planifiedCheckIn,
                            checkIn: data.checkIn,
                            checkOut: data.checkOut,
                            totalDays: data.totalDays
                        } as BookingDisplay
                        return json
                    });

                    return responseFormated;
                }
                throw new Error('Error from api');
            }),
            catchError(error => error),
        );
    }

    getBookingByClient(id: number) {
        const headers = new HttpHeaders().append('Content-Type', 'application/json');
        const params = new HttpParams().append('id', id);
        return this.http.get<Booking[]>(BookingRoutes.GET_BOOKING_BY_CLIENT,
            { headers: headers, params: params }
        ).pipe(
            map((response: any) => {
                if (response) {
                    let responseFormated = response.departments.map((data: any) => {
                        let json = {
                            id: Number(data.id),
                            name: data.name,
                            address: data.address,
                            nameCommune: data.nameCommune
                        } as Booking
                        return json
                    });

                    return responseFormated;
                }
                throw new Error('Error from api');
            }),
            catchError(error => error),
        );
    }

    deleteBooking(id: number) {
        return this.http.delete<{ ok: string }>(BookingRoutes.DELETE_BOOKING, {
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

    createBooking(booking: BookingDTO) {
        return this.http.post<{ ok: string }>(BookingRoutes.POST_BOOKING, booking).pipe(
            map((response: any) => {
                if (response) {
                    return response
                }
                throw new Error('Error from api');
            }),
            catchError(error => error),
        );
    }

    updateBooking(booking: BookingDTO) {
        return this.http.put<{ ok: string }>(BookingRoutes.PUT_BOOKING, booking).pipe(
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
