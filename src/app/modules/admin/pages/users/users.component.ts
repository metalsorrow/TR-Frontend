import { UserFormComponent } from '@admin/components/user-form/user-form.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/modules/shared/components/confirm-dialog/confirm-dialog.component';
import { User } from 'src/app/modules/shared/interface/user';
import { UserService } from 'src/app/modules/shared/services/user/user.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    deleteText: string;
    userList : User[];

    constructor(private dialog: MatDialog,
        private _user: UserService) {
        this.deleteText = "¿Estas Seguro de eliminar este registro?";
        this.userList = [];
    }

    ngOnInit(): void {
        this.loadUser();
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
            if(data && user?.id){
                this._user.deleteUser(user.id).subscribe( result => {
                    this.loadUser();
                })
            }
        }); 
    }

    loadUser(){
        this._user.getUsers().subscribe( userList => {
            this.userList = userList;
        })
    }
}

