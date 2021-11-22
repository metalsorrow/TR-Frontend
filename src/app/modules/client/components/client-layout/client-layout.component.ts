import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.scss'],
})
export class ClientLayoutComponent implements OnInit {
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
