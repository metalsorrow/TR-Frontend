import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingDisplay } from 'src/app/modules/shared/interface/booking';
import { Fine, FinesType } from 'src/app/modules/shared/interface/fine';
import { FinesService } from 'src/app/modules/shared/services/fines/fines-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fines',
  templateUrl: './fines.component.html',
  styleUrls: ['./fines.component.scss']
})
export class FinesComponent implements OnInit {

  formFines = new FormGroup({
    fineType: new FormControl(''),
    quantity: new FormControl('')
  });

  finesTypeList: FinesType[];
  finesList: Fine[];
  constructor(public dialogRef : MatDialogRef<FinesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { booking : BookingDisplay },
    private _fines: FinesService
    ) { 
    this.finesTypeList =[];
    this.finesList =[];
  }

  ngOnInit(): void {
    this.loadFines();
    this.loadFinesTypeList();
  }


  deleteFines($event: Event, fine: Fine){
    $event.preventDefault();
    if(fine.id){
      this._fines.deleteFines(fine.id).subscribe( () => {
        this.loadFines();
      })
    }
  }


  loadFinesTypeList(){
    this._fines.getFinesTypes().subscribe( result => {
      this.finesTypeList = result;
    })
  }

  loadFines(){
    if(this.data.booking.id){
      this._fines.getFines(this.data.booking.id).subscribe( result => {
        this.finesList = result
      })
    }
  }

  registerFine($event: Event){
    $event.preventDefault();
    if(this.data.booking.id){
      let quantity: number = Number(this.formFines.controls['quantity'].value);
      let fineTypeId: number = Number(this.formFines.controls['fineType'].value);
      console.log(quantity, fineTypeId);
  
      let price = this.finesTypeList.find(element => element.id == fineTypeId)?.price || 0;
  
      let newFine: Fine = {
        bookingId: this.data.booking.id,
        totalPrice: (quantity * price),
        fineTypeId: fineTypeId,
        quantity: quantity,
      }
      
      console.log(newFine);

      this._fines.createFines(newFine).subscribe( () => {
        this.loadFines();
        Swal.fire(
          'Multa Completada!',
          `Multa registrada de forma correcta` ,
          'success'
        )
      })
    }
  }

  continue() {
    this.dialogRef.close(true);
  }
}
