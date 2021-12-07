import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Booking, BookingDisplay } from 'src/app/modules/shared/interface/booking';
import { TransportDisplay, TransportDTO } from 'src/app/modules/shared/interface/transport';
import { User } from 'src/app/modules/shared/interface/user';
import { BookingService } from 'src/app/modules/shared/services/booking/booking.service';
import { TransportService } from 'src/app/modules/shared/services/transport/transport.service';
import { UserService } from 'src/app/modules/shared/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transport-form',
  templateUrl: './transport-form.component.html',
  styleUrls: ['./transport-form.component.scss']
})
export class TransportFormComponent implements OnInit {
  bookingList: BookingDisplay[];
  workerList: User[];
  
  formTransport = new FormGroup({
    booking: new FormControl(''),
    worker: new FormControl(''),
    vehicle: new FormControl(''),
    tripInit: new FormControl(''),
    schedule: new FormControl('')
  })

  constructor(
    public dialogRef: MatDialogRef<TransportFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { transport: TransportDisplay },
    private _transport: TransportService,
    private _booking: BookingService,
    private _user: UserService
  ) {
    this.bookingList = [];
    this.workerList = [];
  }

  ngOnInit(): void {
    this.loadUser();
    this.loadBooking();

    if(this.data?.transport){
      this.loadTransport();
    }
  }

  loadTransport(){
    
  }
  
  loadUser(){
    this._user.getUsers().subscribe( (userList: User[]) => {
      this.workerList = userList.filter( user => user.idType == 4 );
    })
  }

  loadBooking(){
    this._booking.getBooking().subscribe( bookingList => {
      this.bookingList = bookingList;
    })
  }

  confirmTransport(){
    
    let newTransport: TransportDTO  = {
      idReserve: this.formTransport.controls['booking'].value,
      idWorker: this.formTransport.controls['worker'].value,
      vehicle: this.formTransport.controls['vehicle'].value,
      place: this.formTransport.controls['tripInit'].value,
      time: this.formTransport.controls['schedule'].value,
    } ;

    this._transport.createTransport(newTransport).subscribe( () => {
      Swal.fire(
        'Transporte Agendado!',
        `Tranporte para la reserva "${newTransport.idReserve} agendada de forma correcta"` ,
        'success'
      )
      this.dialogRef.close(true);
    });
  }

}
