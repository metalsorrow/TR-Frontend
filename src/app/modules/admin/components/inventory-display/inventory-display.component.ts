import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Department } from 'src/app/modules/shared/interface/department';
import { Inventory, InventoryRelation } from 'src/app/modules/shared/interface/inventory';
import { InventoryService } from 'src/app/modules/shared/services/inventory/inventory.service';
import { InventoryDepartmentService } from 'src/app/modules/shared/services/inventoryDepartment/inventory-department.service';

@Component({
    selector: 'app-inventory-display',
    templateUrl: './inventory-display.component.html',
    styleUrls: ['./inventory-display.component.scss']
})
export class InventoryDisplayComponent implements OnInit {
    inventoryList: Inventory[];
    inventoryByDepartment: InventoryRelation[];


    formInventoryRelation = new FormGroup({
        inventory: new FormControl(''),
        quantity: new FormControl('')
    });

    constructor(
        private _inventory: InventoryService,
        private _inventoryDepartment: InventoryDepartmentService,
        public dialogRef: MatDialogRef<InventoryDisplayComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { department: Department },
    ) {
        this.inventoryList = [];
        this.inventoryByDepartment = [];
    }

    ngOnInit(): void {
        this._inventory.getInventory().subscribe(inventories => {
            this.inventoryList = inventories;
        })
        this.loadInventoryRelation();
    }


    loadInventoryRelation() {
        if (this.data?.department?.id) {
            this._inventoryDepartment.getInventoryDepartement(this.data.department.id).subscribe(inventoriesDepartment => {
                this.inventoryByDepartment = inventoriesDepartment;
            })
        }
    }

    deleteElement(inventory: InventoryRelation) {
        this._inventoryDepartment.deleteInventoryDepartement(inventory.id).subscribe(result => {
            this.loadInventoryRelation();
        })
    }

    addInventoryElement() {
        if (this.data?.department) {
            let newInventoryDepartment = {
                departmentId: Number(this.data.department.id),
                quantity: Number(this.formInventoryRelation.controls['quantity'].value),
                inventoryId: Number(this.formInventoryRelation.controls['inventory'].value),
            } as InventoryRelation

            this._inventoryDepartment.createInventoryDepartement(newInventoryDepartment).subscribe(result => {
                this.loadInventoryRelation();
            })

        }
    }


}
