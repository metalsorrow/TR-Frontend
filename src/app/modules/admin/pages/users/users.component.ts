import { UserFormComponent } from '@admin/components/user-form/user-form.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/modules/shared/components/confirm-dialog/confirm-dialog.component';
import { User } from 'src/app/modules/shared/interface/user';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    deleteText: string;
    userList : User[];

    constructor(private dialog: MatDialog) {
        this.deleteText = "¿Estas Seguro de eliminar este registro?";
        this.userList = [{type: "Usuario", firstName: "jose", lastName:"perez", rut: "99.999.999"}];
    }

    ngOnInit(): void {
    }

    formUserDialog(user?: User) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        user ? dialogConfig.data = user : null;

        let resultDialog = this.dialog.open(UserFormComponent, dialogConfig);

        // console.log(resultDialog);
    }

    deleteDialog(user: User) {
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

