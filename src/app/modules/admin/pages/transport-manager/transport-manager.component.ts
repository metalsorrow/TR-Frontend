import { TransportFormComponent } from '@admin/components/transport-form/transport-form.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/modules/shared/components/confirm-dialog/confirm-dialog.component';
import { TransportDisplay, TransportDTO } from 'src/app/modules/shared/interface/transport';
import { TransportService } from 'src/app/modules/shared/services/transport/transport.service';

@Component({
    selector: 'app-transport-manager',
    templateUrl: './transport-manager.component.html',
    styleUrls: ['./transport-manager.component.scss']
})
export class TransportManagerComponent implements AfterViewInit {

    transportList: TransportDisplay[];
    deleteText: string;
    displayedColumns: string[] = ['id', 'idBooking', 'client', 'worker', 'vehicle', 'init', 'end', 'schedule', 'delete'];
    dataSource: MatTableDataSource<TransportDisplay>;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private dialog: MatDialog,
        private _transport: TransportService
    ) {
        this.transportList = []
        this.deleteText = "¿Deseas confirmar la eliminacion para este registro de transporte?"
    }


    ngAfterViewInit(): void {
        this.loadTranspoort();
    }

    loadTranspoort() {
        this._transport.getTransport().subscribe(transportList => {
            this.transportList = transportList
            this.dataSource = new MatTableDataSource<TransportDisplay>(this.transportList);
            this.dataSource.paginator = this.paginator;

        })
    }

    newTransportDialog() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;

        let resultDialog = this.dialog.open(TransportFormComponent, dialogConfig);

        resultDialog.afterClosed().subscribe(data => {
            if (data) {
                this.loadTranspoort();
            }
        })
    }

    deleteDialog(transport: TransportDisplay) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.data = { message: this.deleteText };

        let resultDialog = this.dialog.open(ConfirmDialogComponent, dialogConfig);

        resultDialog.afterClosed().subscribe(data => {
            if (data) {
                this._transport.deleteDepartments(transport.id).subscribe(response => {
                    this.loadTranspoort();
                })
            }
        });
    }

}

