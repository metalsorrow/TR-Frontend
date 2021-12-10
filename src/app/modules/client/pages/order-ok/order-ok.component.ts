import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-ok',
  templateUrl: './order-ok.component.html',
  styleUrls: ['./order-ok.component.scss']
})
export class OrderOkComponent implements OnInit {

  token: string = "";
  constructor( private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.loadToken();
  }

  loadToken(){
    this.route.queryParams
    .subscribe(params => {
      this.token = params.token_ws;
      Swal.fire("Transaccion completada!",'Pago realizado de forma satisfactoria',"success")
    }
  );
  }

}
