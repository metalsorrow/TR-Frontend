import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/modules/shared/interface/booking';
import { ServiceExtra } from 'src/app/modules/shared/interface/service';

@Component({
  selector: 'app-extra-services-manager',
  templateUrl: './extra-services-manager.component.html',
  styleUrls: ['./extra-services-manager.component.scss']
})
export class ExtraServicesManagerComponent implements OnInit {

  //Falta Injection
  total: number;
  serviceList: ServiceExtra[];
  currentServiceList: ServiceExtra[];
  constructor() {
    this.serviceList = [{id: 1, description: 'Arriendo Automovil', price: 1234}];
    this.currentServiceList = [{id: 1, description: 'Arriendo Automovil',price: 1234}];
    this.total = 0;
   }
  ngOnInit(): void {
  }

  deleteElement(booking: ServiceExtra){
    console.log("deleted");
  }
  addService(){
    console.log("add");
  }

}
