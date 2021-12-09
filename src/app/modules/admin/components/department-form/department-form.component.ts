import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { Department } from 'src/app/modules/shared/interface/department';
import { City, Commune, Region } from 'src/app/modules/shared/interface/ubication';
import { CityService } from 'src/app/modules/shared/services/city/city.service';
import { CommuneService } from 'src/app/modules/shared/services/commune/commune.service';
import { DepartmentService } from 'src/app/modules/shared/services/department/department.service';
import { RegionService } from 'src/app/modules/shared/services/region/region.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-department-form',
    templateUrl: './department-form.component.html',
    styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent implements OnInit {

    formDepartment = new FormGroup({
        name: new FormControl(''),
        address: new FormControl(''),
        region: new FormControl(''),
        city: new FormControl(''),
        commune: new FormControl(''),
        description: new FormControl(''),
        totalRooms: new FormControl(''),
        totalParking: new FormControl(''),
        totalBaths: new FormControl(''),
        furnished: new FormControl(''),
        departmentStatus: new FormControl(''),
        departmentPrice: new FormControl(''),
        heating: new FormControl(''),
        internet: new FormControl(''),
        tv: new FormControl(''),
        file: new FormControl(''),
    });

    regionList: Region[];
    communeList: Commune[];
    cityList: City[];
    image: any;

    constructor(
        public dialogRef: MatDialogRef<DepartmentFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { department: Department },
        private _department: DepartmentService,
        private _region: RegionService,
        private _city: CityService,
        private _commune: CommuneService,) {
        this.regionList = [];
        this.communeList = [];
        this.cityList = [];
    }


    ngOnInit(): void {
        forkJoin([
            this._region.getRegions(),
            this._commune.getCommune(),
            this._city.getCities()
        ])
            .subscribe((next) => {

                this.regionList = next[0];
                this.communeList = next[1];
                this.cityList = next[2];
                if (this.data?.department) {
                    this.loadData(this.data.department);
                }
            });

        // .subscribe( (communes: Commune[]) => {
        // });
        // .subscribe( (cities: City[]) => {
        // });


    }


    loadData(department: Department) {
        this.formDepartment.setValue({
            address: department.address,
            description: department.departmentDesc,
            departmentPrice: department.departmentPrice,
            furnished: department.furnished,
            departmentStatus: department.departmentStatus,
            heating: department.heating,
            commune: this.communeList.find(element => String(element.id) == department.idCommune)?.id,
            region: 1,
            city: 1,
            internet: department.internet,
            name: department.name,
            totalBaths: department.totalBaths,
            totalParking: department.totalParking,
            totalRooms: department.totalRooms,
            tv: department.tv
        });
    }

    handleForm(event: Event) {
        event.preventDefault();
        let newDepartment: Department;

        if (!this.data?.department) {
            // const formData = new FormData();
            // formData.append('file', this.formDepartment.get('file')?.value)
            newDepartment = {
                address: this.formDepartment.controls['address'].value,
                departmentDesc: this.formDepartment.controls['description'].value,
                departmentPrice: this.formDepartment.controls['departmentPrice'].value,
                furnished: this.formDepartment.controls['furnished'].value,
                departmentStatus: this.formDepartment.controls['departmentStatus'].value,
                heating: this.formDepartment.controls['heating'].value,
                idCommune: this.formDepartment.controls['commune'].value,
                internet: this.formDepartment.controls['internet'].value,
                name: this.formDepartment.controls['name'].value,
                totalBaths: this.formDepartment.controls['totalBaths'].value,
                totalParking: this.formDepartment.controls['totalParking'].value,
                totalRooms: this.formDepartment.controls['totalRooms'].value,
                tv: this.formDepartment.controls['tv'].value,
                imgB64: this.image.split('base64,')[1]
            }
            this._department.createDepartment(newDepartment).subscribe(response => {
                Swal.fire(
                    'Departamento ingresado!',
                    `Departamento "${newDepartment.name}" creado satisfactoriamente.` ,
                    'success'
                )
                this.continue();
            })
            return true;
        } else {

            newDepartment = {
                id: this.data.department.id,
                address: this.formDepartment.controls['address'].value,
                departmentDesc: this.formDepartment.controls['description'].value,
                departmentPrice: this.formDepartment.controls['departmentPrice'].value,
                furnished: this.formDepartment.controls['furnished'].value,
                departmentStatus: this.formDepartment.controls['departmentStatus'].value,
                heating: this.formDepartment.controls['heating'].value,
                idCommune: this.formDepartment.controls['commune'].value,
                internet: this.formDepartment.controls['internet'].value,
                name: this.formDepartment.controls['name'].value,
                totalBaths: this.formDepartment.controls['totalBaths'].value,
                totalParking: this.formDepartment.controls['totalParking'].value,
                totalRooms: this.formDepartment.controls['totalRooms'].value,
                tv: this.formDepartment.controls['tv'].value
            }

            
            this._department.updateDepartment(newDepartment).subscribe(response => {
                Swal.fire(
                    'Departamento modificado!',
                    `Departamento "${newDepartment.id}" modificado satisfactoriamente.` ,
                    'success'
                )
                this.continue();
            })

            return true
        }
    }

    changeListener($event: any) : void {
        this.readThis($event.target);
    }
    
    readThis(inputValue: any): void {
        var file:File = inputValue.files[0];
        var myReader:FileReader = new FileReader();
      
        myReader.onloadend = (e) => {
          this.image = myReader.result;
        }
        myReader.readAsDataURL(file);
      }


    // onFileChange($event: any) {
  
    //     if ($event.target.files.length > 0) {
    //       const file = $event.target.files[0];
    //       this.formDepartment.patchValue({
    //         file: file
    //       });
    //     }
    //   }
         

    continue() {
        this.dialogRef.close(true);
    }

}
