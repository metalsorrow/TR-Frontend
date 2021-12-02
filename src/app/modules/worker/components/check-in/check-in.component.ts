import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Booking } from 'src/app/modules/shared/interface/booking';
import { BookingService } from 'src/app/modules/shared/services/booking/booking.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {

  formCheckin = new FormGroup({
    checkin: new FormControl('')
  });

  constructor(
    public dialogRef: MatDialogRef<CheckInComponent>,
    private _booking: BookingService,
    @Inject(MAT_DIALOG_DATA) public data: { booking: Booking }
    ) { }

  ngOnInit(): void {
  }

  checkinHandle($event: Event){
    $event.preventDefault();

    let checkinStringDate: string = this.formCheckin.controls['checkin'].value.toLocaleDateString("es-ES");

    this._booking.checkin(checkinStringDate, this.data.booking.id).subscribe( () => {
      this.dialogRef.close(true);
    })
  }

}
