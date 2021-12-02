// export interface Booking{
//     id: number,
//     checkIn?: Date,
//     checkOut?: Date,
//     totalDays: number,
//     totalAdutls: number,
//     totalChild: number,
//     totalPrice: number,
//     status: boolean,
//     communne?: string,
//     address?: string,
//     departmentName: string
// }

export interface BookingDisplay{
    id: number,
    planifiedCheckIn: Date,
    checkIn: Date,
    checkOut: Date,
    totalDays: number,
    totalAdults: number,
    totalKids: number,
    totalBooking: number,
    statusBooking: string,
    departmentId:number,
    clientId: number,
    clientRut: string,
    clientName: string,
    workerId: number,
    departmentName: string,
    departmentAddress: string,
    totalRooms: number,
    totalParking: number,
    totalBaths: number,
    internet: boolean,
    tv: boolean,
    heating: boolean,
    furnished: boolean,
    departmentPrice: number,
    departmentStatus: boolean
    departmentDesc: string,
    idCommune: number
    commune: string
}

export interface BookingDTO{
    id?: number,
    checkIn?: Date,
    checkOut?: Date,
    totalDays: number,
    totalAdutls: number,
    totalChild: number,
    totalPrice: number,
    status: boolean,
    communne?: string,
    address?: string,
    departmentName: string
}


export interface Booking{
    id: number,
    name: string,
    address: string,
    nameCommune: string
}
