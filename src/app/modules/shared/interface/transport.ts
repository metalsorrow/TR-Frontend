import { NumberSymbol } from "@angular/common";

export interface Transport{
    id: number,
    idBooking: number,
    client: string,
    conveyors: string,
    vehicle: string,
    init: string,
    end: string,
    schedule: string
}