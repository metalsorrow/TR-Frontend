import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/modules/shared/interface/department';
import { DepartmentService } from 'src/app/modules/shared/services/department/department.service';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.scss']
})
export class DepartmentDetailComponent implements OnInit {
  department: Department|null;

  constructor(private _department: DepartmentService) {
    this.department = null;
  }

  ngOnInit(): void {
    this.loadDepartment();
  }

  loadDepartment(){
    
  }

}
