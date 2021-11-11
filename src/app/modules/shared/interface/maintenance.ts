export interface Maintenance {
    id: Number,
    fineName: string,
    fineDesc: string,
    price: Number
}

export interface MaintenanceRelation {
    id: Number,
    departmentId: Number
    initDate: string,
    finishDate: string,
    userName: string,
    userId: Number
}