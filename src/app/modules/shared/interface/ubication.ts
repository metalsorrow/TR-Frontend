export interface Region {
    id: number,
    name: string
}

export interface City {
    id: number,
    name: string,
    // idRegion: number
}

export interface Commune {
    id: number,
    name: string,
    // idCity: number
}