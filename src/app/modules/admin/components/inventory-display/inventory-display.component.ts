import { Component, OnInit } from '@angular/core';
import { Inventory, InventoryRelation } from 'src/app/modules/shared/interface/inventory';

@Component({
  selector: 'app-inventory-display',
  templateUrl: './inventory-display.component.html',
  styleUrls: ['./inventory-display.component.scss']
})
export class InventoryDisplayComponent implements OnInit {
  inventoryObjList: Inventory[];
  inventoryList: InventoryRelation[];

  constructor() {
    this.inventoryList = [{id:1, description: 'Televisor', quantity: 3 }];
    this.inventoryObjList = [{id:1, description: "Televisor"}];
  }

  ngOnInit(): void {
  }



  deleteElement(inventory: Inventory){
    console.log('delete');
  }

  addInventoryElement(){
    console.log('save');
  }
}
