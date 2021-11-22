import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetailsDialogComponent } from '@client/components/details-dialog/details-dialog.component';
import { ExtraServicesComponent } from '@client/components/extra-services/extra-services.component';
import { ConfirmDialogComponent } from 'src/app/modules/shared/components/confirm-dialog/confirm-dialog.component';
import { Booking } from 'src/app/modules/shared/interface/booking';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  bookingList: Booking[];
  deleteText: string;

  constructor(private dialog: MatDialog) {
    this.bookingList = [{id: 1, communne: "Ñuñoa" , departmentName: "Suit, paquete de verano", address: "Torre 1234, Las Golondrinas"} as Booking];
    this.deleteText = "¿Confirma la eliminacion de esta reserva?"
  }

  ngOnInit(): void {}

  extraServiceDialog(booking: Booking){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.data = {booking: booking};

    let resultDialog = this.dialog.open(ExtraServicesComponent, dialogConfig);
  }

  detailDialog(booking: Booking){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;

    let resultDialog = this.dialog.open(DetailsDialogComponent, dialogConfig);
  }
  cancelDialog(booking: Booking) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.data = {message: this.deleteText}

    let resultDialog = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    resultDialog.afterClosed().subscribe(data =>{
        console.log("Dialog output:", data)
        if(data){
            //delete user
        }
    }); 
  }
}
