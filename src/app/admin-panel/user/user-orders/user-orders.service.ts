import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserOrdersService {

  orderConfirmMessage = new Subject<any>();

  constructor(private _Http:HttpClient) { }


  // Getting All Pending Orders
  getPenddingOrders(): Observable<any>{
    return this._Http.get("https://localhost:44344/api/UserOrder")
  }

  getSingleOrderDetail(Id:number){
    return this._Http.get("https://localhost:44344/api/UserOrder/" + Id);
  }

  acceptOrder(data:any){
    return this._Http.put("https://localhost:44344/api/UserOrder/AcceptOrder",data);
  }

  chartMonthData(): Observable<any>{
    return this._Http.get("https://localhost:44344/api/UserOrder/OrdersChart")
  }

  CancelOrderAdmin(dataId:number){
    return this._Http.delete("https://localhost:44344/api/UserOrder/" + dataId);
  }



}
