import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';

@Component({
  selector: 'app-worker-layout',
  templateUrl: './worker-layout.component.html',
  styleUrls: ['./worker-layout.component.scss']
})
export class WorkerLayoutComponent implements OnInit {

  constructor( 
    private _auth: AuthService, 
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  logout($event: Event){
    $event.preventDefault();
    this._auth.setSessionUser(null);
    this.router.navigate(['/']);
  }
}
