export interface TransportDTO{
    id?: number,
    idBooking?: number,
    client?: string,
    transport?: string,
    init: string,
    end: string,
    schedule: string,
    vehicle: string,
    state: string,
    bookingId: number,
    transporterId: number
}