import { Component, OnInit } from '@angular/core';
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
  countPendingOrders:number;
  countShippedOrders:number;
  onTabChangeOrder:any = null;

  subscription:Subscription;
  showIndicator = false;
  constructor(private _authService:AuthService, private _userOrders:UserOrdersService) { }

  ngOnInit(): void {
    this.subscription =  this._authService.loadingSpinnerLogOut.subscribe((data:any)=>{
      this.showIndicator = data;
    });



    this.getPenddingOrdersList();
  }


  // Get Pendding Orders List Only
  getPenddingOrdersList(){
    this.subscription = this._userOrders.getPenddingOrders().subscribe((data:any[])=>{
      this.penddingOrders = data.filter(a=>a.orderStatus== "Pending");
      this.shippedOrder = data.filter(a=>a.orderStatus=="Shipped");
      this.countPendingOrders = this.penddingOrders.length;
      this.countShippedOrders = this.shippedOrder.length;
    })
  }

  onTabChanged(event:any){
    console.log(event);
    if(event.index == 0){
      this.onTabChangeOrder = "pending";
    }else if(event.index == 1){
      this.onTabChangeOrder = "shipped"
    }
  }



  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
