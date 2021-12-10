import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  loading: boolean;

  constructor(
    private _department: DepartmentService,
    private route: ActivatedRoute,
    private _sanitizer: DomSanitizer
    ) {
    this.department = null;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadDepartment(params['id']);

    });
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

}
