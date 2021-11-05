import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/modules/shared/interface/booking';
import { User } from 'src/app/modules/shared/interface/user';

@Component({
  selector: 'app-transport-form',
  templateUrl: './transport-form.component.html',
  styleUrls: ['./transport-form.component.scss']
})
export class TransportFormComponent implements OnInit {

  bookingList: Booking[];
  workerList: User[];
  constructor() { 
    this.bookingList = [];
    this.workerList = [];
  }

  ngOnInit(): void {
  }

  confirmTransport(){
    
  }

}
