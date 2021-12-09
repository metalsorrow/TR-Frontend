import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorPopUpComponent } from 'src/app/modules/shared/components/error-pop-up/error-pop-up.component';
import { City, Commune, Region } from 'src/app/modules/shared/interface/ubication';
import { User } from 'src/app/modules/shared/interface/user';
import { CityService } from 'src/app/modules/shared/services/city/city.service';
import { CommuneService } from 'src/app/modules/shared/services/commune/commune.service';
import { RegionService } from 'src/app/modules/shared/services/region/region.service';
import { UserService } from 'src/app/modules/shared/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

    regionList: Region[];
    communeList: Commune[];
    cityList: City[];


    formUser = new FormGroup({
        firstName: new FormControl(''),
        lastNameP: new FormControl(''),
        lastNameM: new FormControl(''),
        rut: new FormControl(''),
        email: new FormControl(''),
        phone: new FormControl(''),
        dateOfBirth: new FormControl(''),
        commune: new FormControl(''),
        region: new FormControl(''),
        city: new FormControl(''),
        pass: new FormControl(''),
        passConfirm: new FormControl(''),
    });

    constructor(
        private _region: RegionService,
        private _commune: CommuneService,
        private _city: CityService,
        private dialog: MatDialog,
        private router: Router,
        private _user: UserService
    ) {
        this.regionList = [];
        this.communeList = [];
        this.cityList = [];
    }

    ngOnInit(): void {
        this._region.getRegions().subscribe((regions: Region[]) => {
            this.regionList = regions;
        });

        this._commune.getCommune().subscribe((communes: Commune[]) => {
            this.communeList = communes;
        });
        this._city.getCities().subscribe((cities: City[]) => {
            this.cityList = cities;
        });

    }

    handleSubmit($event: Event) {
        $event.preventDefault();
        let newUser: User = {
            firstName: this.formUser.controls['firstName'].value,
            rut: this.formUser.controls['rut'].value,
            lastNameP: this.formUser.controls['lastNameP'].value,
            lastNameM: this.formUser.controls['lastNameM'].value,
            mail: this.formUser.controls['email'].value,
            phone: this.formUser.controls['phone'].value,
            dateOfBirth: this.formUser.controls['dateOfBirth'].value.toLocaleDateString("es-ES"),
            idCommune: Number(this.formUser.controls['commune'].value),
            pass: this.formUser.controls['pass'].value,
            idType: 1,
        }

        let confirmPass = this.formUser.controls['passConfirm'].value;

        if (newUser.pass === confirmPass) {
            this._user.createUser(newUser).subscribe(result => {
                Swal.fire(
                    'Cuenta creada satisfactoriamente!',
                    `Estimado ${newUser.firstName} ${newUser.lastNameP}, Bienvenido!. Ya puede ingresar al portal utilizando su correo "${newUser.mail}".` ,
                    'success'
                )
                this.router.navigate(['/','auth']);
            })
        } else {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = { message: 'Contraseñas ingresadas no coinciden, favor confirmar campo ingresado.' }
            this.dialog.open(ErrorPopUpComponent, dialogConfig);
        }
    }

    email = new FormControl('', [Validators.required, Validators.email]);

    getErrorMessage() {
        if (this.email.hasError('required')) {
            return 'You must enter a value';
        }

        return this.email.hasError('email') ? 'Not a valid email' : '';
    }
}
