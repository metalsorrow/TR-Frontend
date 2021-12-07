import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/modules/shared/interface/department';
import { DepartmentService } from 'src/app/modules/shared/services/department/department.service';

@Component({
  selector: 'app-department-detail-login',
  templateUrl: './department-detail-login.component.html',
  styleUrls: ['./department-detail-login.component.scss']
})
export class DepartmentDetailLoginComponent implements OnInit {
  department: Department|null;

  constructor(private _department: DepartmentService, private route: ActivatedRoute) {
    this.department = null;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadDepartment(params['id']);

    });
  }

  loadDepartment(id: any){
    this._department.getDepartmentsbyId(id).subscribe( result => {
      this.department = result;
    })
  }

}
