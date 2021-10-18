import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Department } from 'src/app/modules/shared/interface/department';
import { Worker } from 'src/app/modules/shared/interface/worker';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-maintenance-form',
  templateUrl: './maintenance-form.component.html',
  styleUrls: ['./maintenance-form.component.scss']
})
export class MaintenanceFormComponent implements OnInit {
  workerList: Worker[]
  constructor(public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Department) { 
    this.workerList = [{id: 1, rut: "999.999.999", firstName: "worker dummy"}];
  }

  ngOnInit(): void {
  }

  createMantaince(){

  }
}
