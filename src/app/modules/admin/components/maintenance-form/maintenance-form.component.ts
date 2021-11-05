import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Department } from 'src/app/modules/shared/interface/department';
import { User } from 'src/app/modules/shared/interface/user';
import { MaintenanceService } from 'src/app/modules/shared/services/maintence/maintenance.service';
import { UserService } from 'src/app/modules/shared/services/user/user.service';
import { UserFormComponent } from '../user-form/user-form.component';
// // import * as _moment from 'moment';
// const moment = _moment;


@Component({
  selector: 'app-maintenance-form',
  templateUrl: './maintenance-form.component.html',
  styleUrls: ['./maintenance-form.component.scss']
})
export class MaintenanceFormComponent implements OnInit {

  formMaintenance = new FormGroup({
    worker: new FormControl(),
  });

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });


  workerList: User[]
  constructor(public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { department: Department },
    private _maintenance: MaintenanceService,
    private _user: UserService
    ) { 
    this.workerList = [];
  }

  ngOnInit(): void {
    this._user.getUsers().subscribe( users => {
      this.workerList = users.filter( (user: User) => user.nameType === "worker");
    })
  }

  createMantaince(){
    if(!this.data?.department?.id){
      return;
    }
    let newMantaince = {
      initDate: this.range.controls['start'].value.toLocaleDateString("es-ES"),
      finishDate: this.range.controls['end'].value.toLocaleDateString("es-ES"),
      userId: Number(this.formMaintenance.controls['worker'].value),
      departmentId: this.data.department.id 
    }
    console.log(newMantaince);
    this._maintenance.createMainenance(newMantaince).subscribe( result => {
      this.continue();
    })
  }



  continue(){
    this.dialogRef.close(true);
  }

}
