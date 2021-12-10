import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Booking } from 'src/app/modules/shared/interface/booking';
import { CheckOut } from 'src/app/modules/shared/interface/checkout';
import { CheckOutService } from 'src/app/modules/shared/service/checkout/check-out.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

  checkout: CheckOut | null;
  total: number = 0;
  constructor(
      private _checkout: CheckOutService,
      public dialogRef: MatDialogRef<CheckOutComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { booking: Booking },
    ) {
      this.checkout = null;
      this.total= 0;
    }

  ngOnInit(): void {
    this.loadCheckout();
  }


  loadCheckout(){
    if(this.data?.booking.id){
      this._checkout.getCheckout(this.data.booking.id).subscribe( result => {
        this.checkout = result;
        this.total = result.totalMulta + result.totalExtraServices + result.totalBooking;
      })
    }
  }

  createCheckout($event: Event) {
    $event.preventDefault();
    this._checkout.generateCheckout(this.data.booking.id, this.total).subscribe( res  => {
      Swal.fire(
        'Check Out registrado!',
        `Favor de realizar transaccion vinculada a la reserva #"${this.data.booking.id}".` ,
        'success'
    )
      this.dialogRef.close(true);
    })
  }


}
