import  {Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingDTO } from 'src/app/modules/shared/interface/booking';
import { Department } from 'src/app/modules/shared/interface/department';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { BookingService } from 'src/app/modules/shared/services/booking/booking.service';
import { DepartmentService } from 'src/app/modules/shared/services/department/department.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';






@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.scss']
})
export class DepartmentDetailComponent implements OnInit {
  department: Department|null;
  total: number;
  idDepartment: number; 
  idUser: number; 
  loading: boolean;

  formBooking = new FormGroup({
    checkin: new FormControl(''),
    checkout: new FormControl(''),
    totalAdults: new FormControl(''),
    totalChild: new FormControl(''),
    totalBaby: new FormControl(''),
  });

  constructor(
    private _department: DepartmentService,
    private _booking: BookingService, 
    private _auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private _sanitizer: DomSanitizer
    ) {
    this.department = null;
    this.total = 0;
    this.idDepartment = 0;
    this.idUser = 0;
    this.loading = true;
  }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.idDepartment = params['id'] ;
      this.loadDepartment(params['id']);
    });
    this.loadUser();
  }

  loadDepartment(id: any){
    this.loading = true;
    this._department.getDepartmentsbyId(id).subscribe( result => {
      this.department = result;
      if(this.department){
        // this.department.path = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + result.imgB64) || '' ;
        this.department.path = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + result.imgB64) || '' ;
      }
      this.loading = false;
    })
  }

  loadUser(){
    this._auth.$getSerssionUser().subscribe( user => {
      if(user?.id){
        this.idUser = user.id;
      }
    })
  }

  createBooking($event: Event){
    $event.preventDefault();
    let initDay: string = this.formBooking.controls['checkin'].value.toLocaleDateString("es-ES");
    let splitInitDay = initDay.split("/");
    let formatedInitDay = new Date(splitInitDay[1] + '/' + splitInitDay[0] + '/' + splitInitDay[2]);

    let endDay: string = this.formBooking.controls['checkout'].value.toLocaleDateString("es-ES");
    let splitEndDay = endDay.split("/");
    let formatedEndDay = new Date(splitEndDay[1] + '/' + splitEndDay[0] + '/' + splitEndDay[2]);

    let days = this.calculateDays(formatedInitDay, formatedEndDay);

    let newBooking: BookingDTO = {
      checkInPlanning: initDay,
      checkOut: endDay,
      totalDays: days,
      totalAdults: this.formBooking.controls['totalAdults'].value,
      totalKids: this.formBooking.controls['totalChild'].value,
      totalBabies: this.formBooking.controls['totalBaby'].value,
      totalReserve: this.total,
      statusReserve: 1,
      departmentId: this.idDepartment,
      clientId: this.idUser
    }
    
    this._booking.createBooking(newBooking).subscribe( () => {
      Swal.fire(
        'Reserva Completada!',
        `Departamento ${newBooking.departmentName} registrado para su ingreso para el dia ${initDay}` ,
        'success'
      )
      this.router.navigate(['/','client','booking']);
      }
    );

  }

  refreshTotalValues(){
    if(this.department && this.formBooking.controls['checkin'].value && this.formBooking.controls['checkout'].value){
      let initDay: string = this.formBooking.controls['checkin'].value.toLocaleDateString("es-ES");
      let splitInitDay = initDay.split("/");
      let formatedInitDay = new Date(splitInitDay[1] + '/' + splitInitDay[0] + '/' + splitInitDay[2]);
      
      let endDay: string = this.formBooking.controls['checkout'].value.toLocaleDateString("es-ES");
      let splitEndDay = endDay.split("/");
      let formatedEndDay = new Date(splitEndDay[1] + '/' + splitEndDay[0] + '/' + splitEndDay[2]);
  

      this.total = 
      (this.formBooking.controls["totalAdults"].value * 10000) + 
      (this.formBooking.controls["totalChild"].value * 8000) + 
      (this.formBooking.controls["totalBaby"].value * 5000) + 
      (this.department.departmentPrice * 
        this.calculateDays(formatedInitDay,formatedEndDay)
      );
    }
  }

  calculateDays(dateInit: Date, dateEnd: Date): number{
    let diffTime: number = dateEnd.getTime() - dateInit.getTime();

    return (diffTime / (1000 * 3600 * 24));

  }


}
