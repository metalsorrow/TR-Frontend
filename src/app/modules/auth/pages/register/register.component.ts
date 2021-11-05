import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { City, Commune, Region } from 'src/app/modules/shared/interface/ubication';
import { CityService } from 'src/app/modules/shared/services/city/city.service';
import { CommuneService } from 'src/app/modules/shared/services/commune/commune.service';
import { RegionService } from 'src/app/modules/shared/services/region/region.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  
  regionList: Region[];
  communeList: Commune[];
  cityList: City[];

  constructor(
     private _region: RegionService,
     private _commune: CommuneService,
     private _city: CityService
     ) {
    this.regionList = [];
    this.communeList = [];
    this.cityList = [];
  }

  ngOnInit(): void {
    this._region.getRegions().subscribe( (regions: Region[]) => {
      this.regionList = regions;
    });
    
    this._commune.getCommune().subscribe( (communes: Commune[]) => {
      this.communeList = communes;
    });
    this._city.getCities().subscribe( (cities: City[]) => {
      this.cityList = cities;
    });
    
  }



  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
