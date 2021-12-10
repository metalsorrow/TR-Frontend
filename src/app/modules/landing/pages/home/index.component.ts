import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Department } from 'src/app/modules/shared/interface/department';
import { DepartmentService } from 'src/app/modules/shared/services/department/department.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  departmentList: Department[]; 
  loading: boolean;
  
  constructor(
    private _department: DepartmentService,
    private _sanitizer: DomSanitizer
    ) {
    this.departmentList = [];
    this.loading= true;
  }


  ngOnInit(): void {
    this.loadDepartment();
  }

  loadDepartment(){
    this.loading = true;
    this._department.getDepartmentsDisponibility().subscribe( response => {
      this.departmentList = response;
      this.departmentList = this.departmentList.map(el => {
        el.imgB64 = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + el.imgB64) || '' ;
        return el
      })
      this.loading = false;
    })
  }

}
