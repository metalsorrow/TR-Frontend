import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-pop-up',
  templateUrl: './error-pop-up.component.html',
  styleUrls: ['./error-pop-up.component.scss']
})
export class ErrorPopUpComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ErrorPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }) { }

  ngOnInit(): void {
  }

  cancel(){
      this.dialogRef.close(false);
  }

}
