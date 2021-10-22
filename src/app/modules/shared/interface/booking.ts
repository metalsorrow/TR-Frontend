export interface Booking{
    id: number,
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

export interface BookingWithUser{
    id: number,
    checkIn?: Date,
    checkOut?: Date,
    totalDays: number,
    totalAdutls: number,
    totalChild: number,
    totalPrice: number,
    status: boolean,
    communne?: string,
    address?: string,
    departmentName: string,
    userName: string,
    userRut: string,
    userId: number
}