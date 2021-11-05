export interface Inventory {
    id: number,
    description: string,
    name: string
}
export interface InventoryRelation{
    id: number,
    description: string,
    quantity: number,
    departmentId: number,
    inventoryId: number,
    inventoryName: string,
}