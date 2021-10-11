import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  cartItemsNumber = new Subject<number>();

  constructor(private _Http:HttpClient) { }

  // Order Sending Data From User

  sendOrder(userId:string, orderData:any){
    return this._Http.post("https://localhost:44344/api/UserOrder/" + userId, orderData)
  }


}
