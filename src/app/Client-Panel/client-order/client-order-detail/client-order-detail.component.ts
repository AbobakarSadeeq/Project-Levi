import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UserOrdersService } from 'src/app/admin-panel/user/user-orders/user-orders.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ClientOrderService } from '../client-order.service';

@Component({
  selector: 'app-client-order-detail',
  templateUrl: './client-order-detail.component.html',
  styleUrls: ['./client-order-detail.component.css']
})
export class ClientOrderDetailComponent implements OnInit {

  subscription:Subscription;
  showIndicator = false;
  userOrderDetailData:any;
  orderAcceptedTime:any;
  totalPriceSingleOrder: number = 0;
  shippedDataShowning = true;
  cancelMessage:any = null;



  constructor(private _userOrders:UserOrdersService ,private _activateRoute:ActivatedRoute, private _route:Router, private _authService:AuthService, private _clientOrder:ClientOrderService) { }


  ngOnInit(): void {


  // hide Button of Confirm Order in Shipped Tab
  debugger;
  const getQueryParam = this._activateRoute.snapshot.queryParamMap.get('orderStatus');
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

  // Client can not accept Order



  const getOrderId = this._activateRoute.snapshot.params['id'];
  this.subscription = this._userOrders.getSingleOrderDetail(getOrderId).subscribe((data:any)=>{
    this.userOrderDetailData = data;
    for (var cartItem of data.orderDetail) {
      this.totalPriceSingleOrder = this.totalPriceSingleOrder + (cartItem.quantity * cartItem.price);
    }
  });

}
}
