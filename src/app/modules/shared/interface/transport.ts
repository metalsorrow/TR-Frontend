export interface TransportDTO{
    place: string,
    time: string,
    vehicle: string,
    idReserve: number,
    idWorker: number
}

export interface TransportDisplay{
    id: number,
    idBooking: number,
    client: string,
    worker: string,
    vehicle: string,
    init: string,
    end: string,
    schedule: string
}

