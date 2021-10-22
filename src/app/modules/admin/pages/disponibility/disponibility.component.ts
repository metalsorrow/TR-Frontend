import { DisponibilityDetailsComponent } from '@admin/components/disponibility-details/disponibility-details.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Disponibility } from 'src/app/modules/shared/interface/disponibility';

@Component({
  selector: 'app-disponibility',
  templateUrl: './disponibility.component.html',
  styleUrls: ['./disponibility.component.scss']
})
export class DisponibilityComponent implements OnInit {

  disponibilityList: Disponibility[];
  constructor(private dialog: MatDialog) {
    this.disponibilityList = [{id:1 ,address: "calle 123", name: "Deptototo", price: 123450, commune: "puente alto", status: true}];
  }

  ngOnInit(): void {
  }


  detailDialog(disponibility: Disponibility){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;

    let resultDialog = this.dialog.open(DisponibilityDetailsComponent, dialogConfig);
  }
}
