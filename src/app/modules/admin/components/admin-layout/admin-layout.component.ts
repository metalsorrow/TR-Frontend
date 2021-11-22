import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  constructor(
    private _auth: AuthService, 
    private router:Router
  ) {}

  ngOnInit(): void {}

  logout($event: Event){
    $event.preventDefault();
    this._auth.setSessionUser(null);
    this.router.navigate(['/']);
  }
}
