import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Order } from 'src/app/modules/shared/interface/order';
import { OrderService } from 'src/app/modules/shared/service/order/order.service';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';

@Component({
  selector: 'app-order-pay',
  templateUrl: './order-pay.component.html',
  styleUrls: ['./order-pay.component.scss']
})
export class OrderPayComponent implements AfterViewInit {


  orderList: Order[];
  displayedColumns: string[] = ['ID', 'Precio Total', 'Estado', 'Registro', 'ID Reserva', 'Realizar Pago'];
  dataSource: MatTableDataSource<Order>;
  pay: {url: string, token: string};

    // //Method to test
    // @ViewChild('testForm') testFormElement: any;

    // public testGroup = this.formBuilder.group({
    //   token: ''
    // });
  
  
    // public testMethod(): void {
    //   this.testFormElement.nativeElement.submit();
    // }
    @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
      private _order: OrderService,
      private _auth: AuthService,
      private formBuilder: FormBuilder
  ) {
      this.orderList = [];
      this.pay = {url: "", token:""}
  }


  ngAfterViewInit(): void {
      this.loadOrder();
  }

  loadOrder() {
    this._auth.$getSerssionUser().pipe(
      mergeMap((user) => {
        if(user?.id){
          return this._order.getCheckoutByUser(user.id)
        }
        return of([]);
      })
    ).subscribe((orderList) => {
      this.orderList = orderList;
      this.dataSource = new MatTableDataSource<Order>(this.orderList);
      this.dataSource.paginator = this.paginator;
    })
  }

  generatePay($event: Event, order:Order){
    console.log(order);
    $event.preventDefault();
    this._order.generatePay(order.id).subscribe( (pay: {url: string, token: string}) => {
      this.pay = {url: pay.url, token: pay.token}
      console.log(pay);
      
      // this.testGroup = this.formBuilder.group({
      //   token_ws: pay.token 
      // });
      this.loadOrder();
      // this.submitButton.nativeElement.click();
      // this.form.nativeElement.submit();
      
      // this.testMethod();
    })
  }





}
