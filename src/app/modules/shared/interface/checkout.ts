export interface CheckOut {
    
    totalMulta: number,
    totalExtraServices: number,

    multaList: any[],
    extraServicesList: any[],

    idBooking: number,
    checkin: string,
    checkout: string,
    totalBooking: number,
}