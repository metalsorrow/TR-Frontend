import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DetailsDialogComponent } from '@client/components/details-dialog/details-dialog.component';
import { ExtraServicesComponent } from '@client/components/extra-services/extra-services.component';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/modules/shared/components/confirm-dialog/confirm-dialog.component';
import { Booking } from 'src/app/modules/shared/interface/booking';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { BookingService } from 'src/app/modules/shared/services/booking/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements AfterViewInit {
  bookingList: Booking[];
  deleteText: string;
  displayedColumns: string[] = ['id', 'nameDepto', 'commune', 'address', 'extraService', 'cancel'];
  dataSource: MatTableDataSource<Booking>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private _booking: BookingService, private _auth: AuthService) {
    this.deleteText = "¿Confirma la eliminacion de esta reserva?"
    this.bookingList = [];
    
  }

  ngAfterViewInit(): void {  
    console.log('aqui');
    this.loadBooking();
  }

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
        if(user?.id){
          return this._booking.getBookingByClient(user.id)
        }
        return of([]);
      })
    ).subscribe((booking) => {
      this.bookingList = booking;
      this.dataSource = new MatTableDataSource<Booking>(this.bookingList);
      this.dataSource.paginator = this.paginator;
    })
      
  }

}
