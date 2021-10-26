import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/modules/shared/interface/booking';
import { Worker } from 'src/app/modules/shared/interface/worker';

@Component({
  selector: 'app-transport-form',
  templateUrl: './transport-form.component.html',
  styleUrls: ['./transport-form.component.scss']
})
export class TransportFormComponent implements OnInit {

  bookingList: Booking[];
  workerList: Worker[];
  constructor() { 
    this.bookingList = [];
    this.workerList = [];
  }

  ngOnInit(): void {
  }

  confirmTransport(){
    
  }

}
