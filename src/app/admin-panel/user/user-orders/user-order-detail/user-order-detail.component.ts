import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { UserOrdersService } from '../user-orders.service';

@Component({
  selector: 'app-user-order-detail',
  templateUrl: './user-order-detail.component.html',
  styleUrls: ['./user-order-detail.component.css']
})
export class UserOrderDetailComponent implements OnInit {

  userOrderDetailData:any;
  orderAcceptedTime:any;
  totalPriceSingleOrder: number = 0;
  shippedDataShowning = true;
  cancelMessage:any = null;

  subscription:Subscription;
  showIndicator = false;
  constructor(private confirmationService: ConfirmationService,private _activeRoute:ActivatedRoute, private _route:Router,private _authService:AuthService, private _userOrders:UserOrdersService) { }

  ngOnInit(): void {

    // hide Button of Confirm Order in Shipped Tab
    debugger;
    const getQueryParam = this._activeRoute.snapshot.queryParamMap.get('orderStatus');
    if(getQueryParam =="shipped"){
      this.shippedDataShowning = false;
    }else if(getQueryParam == "canceled"){
      this.shippedDataShowning = false;
      this.cancelMessage = "Order canceled";
    }

    this.orderAcceptedTime =  new Date();
    this.subscription =  this._authService.loadingSpinnerLogOut.subscribe((data:any)=>{
      this.showIndicator = data;
    });


    const getOrderId = this._activeRoute.snapshot.params['id'];
    this.subscription = this._userOrders.getSingleOrderDetail(getOrderId).subscribe((data:any)=>{
      this.userOrderDetailData = data;
      for (var cartItem of data.orderDetail) {
        this.totalPriceSingleOrder = this.totalPriceSingleOrder + (cartItem.quantity * cartItem.price);
      }
    });

  }

  confirmOrder(data:any){
      this.confirmationService.confirm({
      message: 'Are you sure you want to Confirm this Order?',
      accept: () => {
        this.showIndicator = true;
        this.subscription = this._userOrders.acceptOrder(data).pipe(delay(2500)).subscribe(()=>{
          this.showIndicator = false;
          this._route.navigate(['/Admin/UserOrders']);
          this._userOrders.orderConfirmMessage.next("Order has been confirm and shipped");
        })
      }
    });

  }



}
