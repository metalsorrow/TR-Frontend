import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Booking, BookingDTO } from 'src/app/modules/shared/interface/booking';
import { Reservex } from 'src/app/modules/shared/interface/reservex';
import { ServiceExtra } from 'src/app/modules/shared/interface/service';
import { ServexService } from 'src/app/modules/shared/services/servex/servex.service';

@Component({
  selector: 'app-extra-services',
  templateUrl: './extra-services.component.html',
  styleUrls: ['./extra-services.component.scss']
})
export class ExtraServicesComponent implements OnInit {


  formReservex = new FormGroup({
    servex: new FormControl(''),
    quantity: new FormControl('')
  });


  total: number;
  serviceList: ServiceExtra[];
  currentServiceList: ServiceExtra[];
  constructor(public dialogRef: MatDialogRef<ExtraServicesComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { booking: BookingDTO },
      private _servex: ServexService
      ) {
    this.serviceList = [{id: 1, description: 'Arriendo Automovil', price: 1234}];
    this.currentServiceList = [{id: 1, description: 'Arriendo Automovil',price: 1234}];
    this.total = 0;
   }

  ngOnInit(): void {
    this.loadReservex();
    this.loadServex();
  }

  addService($event: Event){
    $event.preventDefault();
    if(this.data.booking.id){
      let quantity: number = Number(this.formReservex.controls['quentity'].value);
      let servexId: number = Number(this.formReservex.controls['description'].value);
  
      let price = this.serviceList.find(element => element.id == servexId)?.price || 0;
  
      let reservex: Reservex = {
        bookingId: this.data.booking.id,
        quantity: quantity,
        subtotal: (quantity * price),
        servexId: servexId,
      }
  
      this._servex.createReservex(reservex).subscribe( () => {
        this.loadReservex();
      })
    }
  }

  loadServex(){
    this._servex.getServex().subscribe( result => {
      this.serviceList = result;
    })
  }

  loadReservex(){
    if(this.data.booking.id){
      this._servex.getReservex(this.data.booking.id).subscribe( result => {
        this.currentServiceList = result
      })
    }
  }

  continue() {
    this.dialogRef.close(true);
  }
}
