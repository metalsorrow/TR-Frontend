export interface User {
    id?: number,
    rut: string,
    firstName: string,
    lastNameP: string,
    lastNameM: string,
    dateOfBirth: string,
    mail: string,
    phone: string,
    pass: string,
    idCommune: number,
    nameCommune?: string,
    idType: number,
    userType?: string
}
export interface TypeUser {
    id: number,
    name: string,
}