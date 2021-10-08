import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  cartItemsNumber = new Subject<number>();

  constructor() { }
}
