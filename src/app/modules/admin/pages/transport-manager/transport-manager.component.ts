import { TransportFormComponent } from '@admin/components/transport-form/transport-form.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/modules/shared/components/confirm-dialog/confirm-dialog.component';
import { TransportDTO } from 'src/app/modules/shared/interface/transport';

@Component({
  selector: 'app-transport-manager',
  templateUrl: './transport-manager.component.html',
  styleUrls: ['./transport-manager.component.scss']
})
export class TransportManagerComponent implements OnInit {

  transportList: TransportDTO[];
  deleteText: string;

  d = new Date();
  datestring = this.d.getDate()  + "-" + (this.d.getMonth()+1) + "-" + this.d.getFullYear() + " " +
  this.d.getHours() + ":" + this.d.getMinutes();

  
  constructor(private dialog: MatDialog) { 
    this.transportList = [{id: 1, idBooking: 2, client: "User", transport: "worker", vehicle: "vehiculo 123", init:"desde", end: "hasta" , schedule: this.datestring} as TransportDTO]
    this.deleteText = "¿Deseas confirmar la eliminacion para este registro de transporte?"
  }

  ngOnInit(): void {
  }

  newTransportDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;

    let resultDialog = this.dialog.open(TransportFormComponent, dialogConfig);
  }

  modifyDialog(transport: TransportDTO){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.data = { data: transport };

    let resultDialog = this.dialog.open(TransportFormComponent, dialogConfig);
  }

  deleteDialog(transport: TransportDTO){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.data = { message: this.deleteText };

    let resultDialog = this.dialog.open(ConfirmDialogComponent, dialogConfig);
  }

}

