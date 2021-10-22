import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CheckInComponent } from '@worker/components/check-in/check-in.component';
import { CheckOutComponent } from '@worker/components/check-out/check-out.component';
import { ExtraServicesManagerComponent } from '@worker/components/extra-services-manager/extra-services-manager.component';
import { FinesComponent } from '@worker/components/fines/fines.component';
import { Booking, BookingWithUser } from 'src/app/modules/shared/interface/booking';

@Component({
  selector: 'app-booking-manager',
  templateUrl: './booking-manager.component.html',
  styleUrls: ['./booking-manager.component.scss']
})
export class BookingManagerComponent implements OnInit {

  bookingList: BookingWithUser[];
  constructor(private dialog: MatDialog) {
    this.bookingList = [{id: 1, communne: "Ñuñoa" , departmentName: "Suit, paquete de verano", address: "Torre 1234, Las Golondrinas",userName:"User", userRut:"12.200.099-3"} as BookingWithUser];
   }

  ngOnInit(): void {}

    finesDialog(booking: BookingWithUser){
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = false;
      dialogConfig.data = { selected: booking };

      let resultDialog = this.dialog.open(FinesComponent, dialogConfig);
    }

    extraServicesDialog(booking: BookingWithUser){
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = false;
      dialogConfig.data = { selected: booking };

      let resultDialog = this.dialog.open(ExtraServicesManagerComponent, dialogConfig);
    }
    checkInDialog(booking: BookingWithUser){
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = false;
      dialogConfig.data = { selected: booking };

      let resultDialog = this.dialog.open(CheckInComponent, dialogConfig);
    }
    checkOutDialog(booking: Booking){
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = false;
      dialogConfig.data = { selected: booking };

      let resultDialog = this.dialog.open(CheckOutComponent, dialogConfig);
    }
}
