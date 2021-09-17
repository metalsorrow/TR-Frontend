import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  regionList = ['Region 1', 'Region 2', 'Region 3'];
  cityList = ['Ciudad 1', 'Ciudad 2', 'Ciudad 3'];
  communeList = ['Comuna 1', 'Comuna 2', 'Comuna 3'];

  constructor() {}

  ngOnInit(): void {}

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
