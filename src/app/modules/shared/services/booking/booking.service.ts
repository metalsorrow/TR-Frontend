import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Booking, BookingDisplay, BookingDTO } from '../../interface/booking';

export enum BookingRoutes {
    GET_BOOKING_BY_CLIENT = "/api/getReservaByUser",
    GET_BOOKING = "/api/reserve",
    DELETE_BOOKING = "/api/reserve",
    PUT_BOOKING = "/api/reserve",
    POST_BOOKING = "/api/reserve",
    CHECK_IN = "/api/checkInReserve",
}

@Injectable({
    providedIn: 'root'
})
export class BookingService {

    constructor(private http: HttpClient) { }


    getBooking() {
        return this.http.get<BookingDisplay[]>(BookingRoutes.GET_BOOKING).pipe(
            map((response: any) => {
                if (response) {
                    console.log(response);
                    let responseFormated = response.reserves.map((data: any) => {
                        let json = {
                            id: Number(data.id),
                            planifiedCheckIn: data.planifiedCheckIn,
                            checkIn: data.checkIn,
                            checkOut: data.checkOut,
                            totalDays: data.totalDays,
                            departmentName: data.departmentName,
                            commune: data.idCommune,
                            clientId: data.clientId,
                            clientName: data.clientId,
                            clientRut: data.clientId,
                            statusBooking: data.statusReserve
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
                    let responseFormated = response.reserve.map((data: any) => {
                        let json = {
                            id: Number(data.id),
                            name: data.departmentName,
                            address: data.departmentAddress,
                            nameCommune: data.communeName
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


    checkin(checkDate: string, id: number){
        return this.http.put<{ ok: string }>(BookingRoutes.CHECK_IN, { checkIn: checkDate, reserveId: id}).pipe(
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
