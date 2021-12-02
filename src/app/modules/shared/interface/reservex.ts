export interface Reservex  {
    id?: number,
    quantity: number,
    subtotal: number,
    servexId: number,
    bookingId: number,
    servex?: string
}


export interface Servex {
    id: number,
    description: string,
    price: number
}