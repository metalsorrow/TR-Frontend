import { DepartmentFormComponent } from '@admin/components/department-form/department-form.component';
import { InventoryDisplayComponent } from '@admin/components/inventory-display/inventory-display.component';
import { MaintenanceFormComponent } from '@admin/components/maintenance-form/maintenance-form.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/modules/shared/components/confirm-dialog/confirm-dialog.component';
import { Department } from 'src/app/modules/shared/interface/department';
import { DepartmentService } from 'src/app/modules/shared/services/department/department.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-departments',
    templateUrl: './departments.component.html',
    styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit, AfterViewInit {

    deleteText: string;
    disponibilityText: string;
    departmentList: Department[];
    departmentRef: Department;

    displayedColumns: string[] = ['ID', 'Disponibilidad', 'Nombre_Departamento', 'Comuna', 'Direccion', 'Precio', 'Mantenimiento', 'Estado_de_Disponibilidad', 'Inventario','Modificar','Eliminar'];
    dataSource: MatTableDataSource<Department>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private dialog: MatDialog, private _department: DepartmentService) {
        this.departmentRef = {} as Department;
        this.deleteText = "¿Estas Seguro de eliminar este registro?";
        this.disponibilityText = "¿Confirma el cambio de disponibilidad para este departamento?";
        this.departmentList = [];
    }

    ngOnInit(): void {
        this.loadDepartment();
    }

    ngAfterViewInit(): void {
        this.loadDepartment();
    }

    formDepartmentDialog(department?: Department) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.data = {department: department};

        let resultDialog = this.dialog.open(DepartmentFormComponent, dialogConfig);

        resultDialog.afterClosed().subscribe(data => {
            this.loadDepartment();
        });
    }

    maintenceDialog(department: Department) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {department: department};

        dialogConfig.disableClose = false;

        let resultDialog = this.dialog.open(MaintenanceFormComponent, dialogConfig);
    }

    inventoryDialog(department: Department) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.data = {department: department}

        let resultDialog = this.dialog.open(InventoryDisplayComponent, dialogConfig);
    }

    deleteDialog(department: Department) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.data = { message: this.deleteText }

        let resultDialog = this.dialog.open(ConfirmDialogComponent, dialogConfig);

        resultDialog.afterClosed().subscribe(data => {
            if (data && department.id) {
                this._department.deleteDepartments(department.id).subscribe( (result: any) => {
                    Swal.fire(
                        'Departamento eliminado!',
                        `Departamento "${department.id}" modificado satisfactoriamente.` ,
                        'success'
                    )
                    this.loadDepartment();
                })
            }
        });
    }

    loadDepartment(){
        this._department.getDepartments().subscribe( (departments: Department[]) =>{
            this.departmentList = departments;
            this.dataSource = new MatTableDataSource<Department>(this.departmentList);
            this.dataSource.paginator = this.paginator;
        } )
    }


    changeDisponibility(department: Department){
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.data = { message: this.disponibilityText }

        let resultDialog = this.dialog.open(ConfirmDialogComponent, dialogConfig);

        resultDialog.afterClosed().subscribe(data => {
            if (data && department.id) {
                this._department.changeDisponibility(department.id).subscribe( (result: any) => {
                    this.loadDepartment();
                })
            }
        });
    }

    // changeFile(file: any) {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = () => resolve(reader.result);
    //         reader.onerror = error => reject(error);
    //     });
    // }

    // uploadFile(event: any) {
    //     if (event.target.value) {
    //         const file = event.target.files[0];
    //         const type = file.type;
    //         this.changeFile(file).then((base64: string): any => {
    //             let b64Blob: any;
    //             console.log(base64);
    //             this.departmentRef. = b64Blob([base64], type);
    //             console.log(this.fileBlob)
    //         });
    //     } else alert('Nothing')
    // }
}
