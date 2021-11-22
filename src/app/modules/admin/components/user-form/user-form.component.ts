import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { ErrorPopUpComponent } from 'src/app/modules/shared/components/error-pop-up/error-pop-up.component';
import { City, Commune, Region } from 'src/app/modules/shared/interface/ubication';
import { TypeUser, User } from 'src/app/modules/shared/interface/user';
import { CityService } from 'src/app/modules/shared/services/city/city.service';
import { CommuneService } from 'src/app/modules/shared/services/commune/commune.service';
import { RegionService } from 'src/app/modules/shared/services/region/region.service';
import { TypeUserService } from 'src/app/modules/shared/services/typeUser/type-user.service';
import { UserService } from 'src/app/modules/shared/services/user/user.service';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

    regionList: Region[];
    communeList: Commune[];
    cityList: City[];
    typeUserList: TypeUser[];


    formUser = new FormGroup({
        firstName: new FormControl(''),
        lastNameP: new FormControl(''),
        lastNameM: new FormControl(''),
        email: new FormControl(''),
        phone: new FormControl(''),
        dateOfBirth: new FormControl(''),
        commune: new FormControl(''),
        region: new FormControl(''),
        city: new FormControl(''),
        pass: new FormControl(''),
        passConfirm: new FormControl(''),
        typeUser: new FormControl('')
    });

    constructor(
        public dialogRef: MatDialogRef<UserFormComponent>,
        private _region: RegionService,
        private _commune: CommuneService,
        private _city: CityService,
        private _typeUser: TypeUserService,
        private _user: UserService,
        private dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: { user: User }) {


        this.regionList = [];
        this.communeList = [];
        this.cityList = [];
        this.typeUserList = [{ id: 1, name: "admin" }]
    }

    ngOnInit(): void {
        forkJoin([
            this._region.getRegions(),
            this._commune.getCommune(),
            this._city.getCities(),
            this._typeUser.getTypeUser(),
        ])
            .subscribe((next) => {

                this.regionList = next[0];
                this.communeList = next[1];
                this.cityList = next[2];
                this.typeUserList = next[3];
                if (this.data?.user) {
                    this.loadData(this.data.user);
                }
            });
    }

    //?
    email = new FormControl('', [Validators.required, Validators.email]);

    getErrorMessage() {
        if (this.email.hasError('required')) {
            return 'You must enter a value';
        }

        return this.email.hasError('email') ? 'Not a valid email' : '';
    }
    
    loadData(user: User){
        let arrayDate = user.dateOfBirth.split("/");
        let formatDate = new Date(arrayDate[1] + '/' + arrayDate[0] + '/' + arrayDate[2]);
        this.formUser.setValue({
            firstName: user.firstName,
            lastNameP: user.lastNameP,
            lastNameM: user.lastNameM,
            email: user.mail,
            phone: user.phone,
            dateOfBirth: formatDate,
            commune: this.communeList.find(element => element.id == user.idCommune)?.id,
            region: 1,
            city: 1,
            pass: user.pass,
            passConfirm: user.pass,
            typeUser: this.typeUserList.find(element => element.id == user.idType)?.id
        });
    }

    createUser() {
        
        let newUser: User = {
            firstName: this.formUser.controls['firstName'].value,
            lastNameP: this.formUser.controls['lastNameP'].value,
            lastNameM: this.formUser.controls['lastNameM'].value,
            mail: this.formUser.controls['email'].value,
            phone: this.formUser.controls['phone'].value,
            dateOfBirth: this.formUser.controls['dateOfBirth'].value.toLocaleDateString("es-ES"),
            idCommune: Number(this.formUser.controls['commune'].value),
            pass: this.formUser.controls['pass'].value,
            idType: Number(this.formUser.controls['typeUser'].value),
        }
        let confirmPass = this.formUser.controls['passConfirm'].value;

        if (newUser.pass === confirmPass) {
            this._user.createUser(newUser).subscribe( result => {
                this.continue();
            })
        } else {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {message: 'Contraseñas ingresadas no coinciden, favor confirmar campo ingresado.'}
            this.dialog.open(ErrorPopUpComponent, dialogConfig);
        }
    }

    updateUser(){
        let newUser: User = {
            id: this.data.user.id,
            firstName: this.formUser.controls['firstName'].value,
            lastNameP: this.formUser.controls['lastNameP'].value,
            lastNameM: this.formUser.controls['lastNameM'].value,
            mail: this.formUser.controls['email'].value,
            phone: this.formUser.controls['phone'].value,
            dateOfBirth: this.formUser.controls['dateOfBirth'].value.toLocaleDateString("es-ES"),
            idCommune: Number(this.formUser.controls['commune'].value),
            pass: this.formUser.controls['pass'].value,
            idType: Number(this.formUser.controls['typeUser'].value),
        }
        let confirmPass = this.formUser.controls['passConfirm'].value;

        if (newUser.pass === confirmPass) {
            this._user.updateUser(newUser).subscribe( result => {
                this.continue();
            })
        } else {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {message: 'Contraseñas ingresadas no coinciden, favor confirmar campo ingresado.'}
            this.dialog.open(ErrorPopUpComponent, dialogConfig);
        }
    }

    handleSubmit($event: Event){
        $event.preventDefault();

        if(this.data){
            this.updateUser();
        } else {
            this.createUser();
        }
    }

    continue() {
        this.dialogRef.close(true);
    }

    // onNoClick(): void {
    //     this.dialogRef.close();
    // }
}
