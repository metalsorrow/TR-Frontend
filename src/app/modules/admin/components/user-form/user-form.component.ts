import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<UserFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { data: string }) { }

    ngOnInit(): void {
    }

    regionList = ['Region 1', 'Region 2', 'Region 3'];
    cityList = ['Ciudad 1', 'Ciudad 2', 'Ciudad 3'];
    communeList = ['Comuna 1', 'Comuna 2', 'Comuna 3'];

    email = new FormControl('', [Validators.required, Validators.email]);

    getErrorMessage() {
        if (this.email.hasError('required')) {
            return 'You must enter a value';
        }

        return this.email.hasError('email') ? 'Not a valid email' : '';
    }

    // onNoClick(): void {
    //     this.dialogRef.close();
    // }
}
