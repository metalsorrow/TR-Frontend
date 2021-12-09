export interface Fine {
    id?: number,
    name?: string,
    totalPrice: number,
    bookingId?: number,  
    fineTypeId?: number,  
    quantity?: number,  
}
export interface FinesType {
    id: number,
    name: string,
    price: number
}   