import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CheckInComponent } from '@worker/components/check-in/check-in.component';
import { CheckOutComponent } from '@worker/components/check-out/check-out.component';
import { ExtraServicesManagerComponent } from '@worker/components/extra-services-manager/extra-services-manager.component';
import { FinesComponent } from '@worker/components/fines/fines.component';
import { Booking, BookingDisplay, } from 'src/app/modules/shared/interface/booking';
import { BookingService } from 'src/app/modules/shared/services/booking/booking.service';

@Component({
  selector: 'app-booking-manager',
  templateUrl: './booking-manager.component.html',
  styleUrls: ['./booking-manager.component.scss']
})
export class BookingManagerComponent implements OnInit {

  bookingList: BookingDisplay[];
  displayedColumns: string[] = ['ID', 'Nombre_Departamento', 'Comuna', 'Rut_Cliente', 'Nombre_Cliente', 'Multas', 'Servicios_Extras', 'Check-IN', 'Check-OUT'];
  dataSource: MatTableDataSource<BookingDisplay>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private _booking: BookingService) {
    this.bookingList = [{id: 1, commune: "Ñuñoa" , departmentName: "Suit, paquete de verano", departmentAddress: "Torre 1234, Las Golondrinas", clientId:1, clientRut:"12.200.099-3"}] as BookingDisplay[];
   }

  ngOnInit(): void {
    this.loadBooking();
  }

    finesDialog(booking: BookingDisplay){
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = false;
      dialogConfig.data = { booking: booking };

      let resultDialog = this.dialog.open(FinesComponent, dialogConfig);
    }

    extraServicesDialog(booking: BookingDisplay){
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = false;
      dialogConfig.data = { booking: booking };

      let resultDialog = this.dialog.open(ExtraServicesManagerComponent, dialogConfig);
    }
    checkInDialog(booking: BookingDisplay){
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = false;
      dialogConfig.data = { booking: booking };

      let resultDialog = this.dialog.open(CheckInComponent, dialogConfig);
      resultDialog.afterClosed().subscribe(data => {
        if (data) {
          this.loadBooking();
        }
      });

    }
    checkOutDialog(booking: BookingDisplay){
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = false;
      dialogConfig.data = { booking: booking };

      let resultDialog = this.dialog.open(CheckOutComponent, dialogConfig);
      resultDialog.afterClosed().subscribe(data => {
        if (data) {
          this.loadBooking();
        }
      });
    }

    loadBooking(){
      this._booking.getBooking().subscribe( result => {
        this.bookingList = result;
        this.dataSource = new MatTableDataSource<BookingDisplay>(this.bookingList);
        this.dataSource.paginator = this.paginator;
      })
    }
}
