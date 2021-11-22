import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorPopUpComponent } from 'src/app/modules/shared/components/error-pop-up/error-pop-up.component';
import { User } from 'src/app/modules/shared/interface/user';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { UserService } from 'src/app/modules/shared/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin = new FormGroup({
    mail: new FormControl(),
    pass: new FormControl(),
  })

  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  constructor(
    private _user: UserService,
    private _auth: AuthService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }


  handleSubmit($event: Event){
    $event.preventDefault();
    let mail = this.formLogin.controls['mail'].value;
    let pass = this.formLogin.controls['pass'].value;

    if(mail && pass){
      this._user.loginUser(mail, pass).subscribe( user => {
        if(!user){
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {message: 'Credenciales Invalidas'}
          this.dialog.open(ErrorPopUpComponent, dialogConfig);        
        } else {
          user = user[0];
          //falta pass y comunas
          let formatUser: User ={
            id: user.id,
            dateOfBirth: user.dob,
            firstName: user.firstName,
            lastNameP: user.lastNameP,
            lastNameM: user.lastNameM,
            mail: user.mail,
            phone: user.phone,
            userType: user.typeUser,
          } as User
          this._auth.setSessionUser(formatUser);
          console.log(formatUser.userType);
          this.router.navigate(['/', formatUser.userType ]);

        }
      })
    } else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {message: 'Es necesario que ingrese su correo y contraseña.'}
      this.dialog.open(ErrorPopUpComponent, dialogConfig);
    }
  }
}
