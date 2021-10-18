import { DepartmentFormComponent } from '@admin/components/department-form/department-form.component';
import { MaintenanceFormComponent } from '@admin/components/maintenance-form/maintenance-form.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/modules/shared/components/confirm-dialog/confirm-dialog.component';
import { Department } from 'src/app/modules/shared/interface/department';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  deleteText: string;
  departmentList: Department[];
  constructor(private dialog: MatDialog) {
    this.deleteText = "¿Estas Seguro de eliminar este registro?";
    this.departmentList = [{id: 1, name: "Las palmas 2323", address: "calle 123", price: 12000, state: "Puente Altoooo" }];
  }

  ngOnInit(): void {
  }

  formDepartmentDialog(department?: Department){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;

    let resultDialog = this.dialog.open(DepartmentFormComponent, dialogConfig);
  }

  maintenceDialog(deparment: Department){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;

    let resultDialog = this.dialog.open(MaintenanceFormComponent, dialogConfig);
  }

  deleteDialog(department: Department) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.data = {message: this.deleteText}

    let resultDialog = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    resultDialog.afterClosed().subscribe(data =>{
        console.log("Dialog output:", data)
        if(data){
            //delete user
        }
    }); 
}
}
