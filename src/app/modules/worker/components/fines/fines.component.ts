import { Component, OnInit } from '@angular/core';
import { FinesType } from 'src/app/modules/shared/interface/fine';

@Component({
  selector: 'app-fines',
  templateUrl: './fines.component.html',
  styleUrls: ['./fines.component.scss']
})
export class FinesComponent implements OnInit {

  finesTypeList: FinesType[]
  constructor() { 
    this.finesTypeList =[];
  }

  ngOnInit(): void {
  }

  registerFine(){
    console.log('register!');
  }

}
