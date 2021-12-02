import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/modules/shared/interface/department';
import { DepartmentService } from 'src/app/modules/shared/services/department/department.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
