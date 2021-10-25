import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { multicast } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { UserOrdersService } from './user-orders.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  penddingOrders:any[] = [];
  shippedOrder:any[] =[];
  cancelOrder:any[] = [];
  countPendingOrders:number;
  countShippedOrders:number;
  countCancelOrders:number;
  onTabChangeOrder:any = null;

  subscription:Subscription;
  showIndicator = false;
  constructor(private DialogService:ConfirmationService, private _authService:AuthService, private _userOrders:UserOrdersService) { }

  ngOnInit(): void {
    this.subscription =  this._authService.loadingSpinnerLogOut.subscribe((data:any)=>{
      this.showIndicator = data;
    });



    this.getAllOrdersOfUser();
  }


  // Get Pendding Orders List Only
  getAllOrdersOfUser(){
    this.subscription = this._userOrders.getPenddingOrders().subscribe((data:any[])=>{
      this.penddingOrders = data.filter(a=>a.orderStatus== "Pending");
      this.shippedOrder = data.filter(a=>a.orderStatus=="Shipped");
      this.cancelOrder = data.filter(a=>a.orderStatus == "Canceled");
      this.countPendingOrders = this.penddingOrders.length;
      this.countShippedOrders = this.shippedOrder.length;
      this.countCancelOrders = this.cancelOrder.length;
    });
  }

  onTabChanged(event:any){
    if(event.index == 0){
      this.onTabChangeOrder = "pending";
    }else if(event.index == 1){
      this.onTabChangeOrder = "shipped";
    }else if(event.index == 2){
      this.onTabChangeOrder = "canceled";
    }
  }

  // Deleteing Order
  CancelingOrderByAdmin(dataId:number){
    this.DialogService.confirm({
      message: 'Are you sure you want to Cancel this completely order?',
      accept: () => {
        this.showIndicator = true;
       this.subscription =  this._userOrders.CancelOrderAdmin(dataId).subscribe(() => {
          this.getAllOrdersOfUser();
          this.showIndicator = false;
        })
      }
    });
  }



  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
