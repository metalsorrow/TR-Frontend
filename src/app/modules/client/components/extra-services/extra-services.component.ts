import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/modules/shared/interface/booking';
import { ServiceExtra } from 'src/app/modules/shared/interface/service';

@Component({
  selector: 'app-extra-services',
  templateUrl: './extra-services.component.html',
  styleUrls: ['./extra-services.component.scss']
})
export class ExtraServicesComponent implements OnInit {

  total: number;
  serviceList: ServiceExtra[];
  currentServiceList: ServiceExtra[];
  userBookingList: Booking[];
  constructor() {
    this.serviceList = [{id: 1, description: 'Arriendo Automovil', price: 1234}];
    this.currentServiceList = [{id: 1, description: 'Arriendo Automovil',price: 1234}];
    this.userBookingList = [{id: 1, departmentName: "Condominio ñuñoa 123"} as Booking];
    this.total = 0;
   }

  ngOnInit(): void {
  }

  addService(){
    console.log("saved");
  }

}
