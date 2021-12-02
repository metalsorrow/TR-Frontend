import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetailsDialogComponent } from '@client/components/details-dialog/details-dialog.component';
import { ExtraServicesComponent } from '@client/components/extra-services/extra-services.component';
import { forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/modules/shared/components/confirm-dialog/confirm-dialog.component';
import { Booking } from 'src/app/modules/shared/interface/booking';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { BookingService } from 'src/app/modules/shared/services/booking/booking.service';
import { UserService } from 'src/app/modules/shared/services/user/user.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  bookingList: Booking[];
  deleteText: string;

  constructor(private dialog: MatDialog, private _booking: BookingService, private _auth: AuthService) {
    this.bookingList = [
      {id: 1, nameCommune: "Ñuñoa" , name: "Suit, paquete de verano", address: "Torre 1234, Las Golondrinas"} as Booking,
      {id: 2, nameCommune: "Ñuñoa" , name: "Suit, paquete de verano", address: "Torre 1234, Las Golondrinas"} as Booking,
    ];
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

    dialogConfig.disableClose = false;
    dialogConfig.data = {message: this.deleteText}

    let resultDialog = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    resultDialog.afterClosed().subscribe(data =>{
        if(data){
          this._booking.deleteBooking(booking.id).subscribe( response => {
            this.loadBooking();
          })
        }
    }); 
  }

  loadBooking(){
    this._auth.$getSerssionUser().pipe(
      mergeMap((user) => {
        console.log(user);
        return this._booking.getBookingByClient(user.id)
      })
    ).subscribe((booking) => {
      this.bookingList = booking;
    })
      
  }
}
