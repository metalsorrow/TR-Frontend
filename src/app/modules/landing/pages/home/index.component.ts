import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/modules/shared/interface/department';
import { DepartmentService } from 'src/app/modules/shared/services/department/department.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  departmentList: Department[]; 
  
  constructor(private _department: DepartmentService) {
    this.departmentList = [];
  }


  ngOnInit(): void {
    this.loadDepartment();
  }

  loadDepartment(){
    this._department.getDepartmentsDisponibility().subscribe( response => {
      this.departmentList = response;
    })
  }

}
