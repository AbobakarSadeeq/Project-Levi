import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  addQuantity = 0;
  subscription:SubscriptionLike;
  showIndicator = false;
  constructor(private _route:Router, private _activateRoute:ActivatedRoute) { }

  ngOnInit(): void {


  }


  addingProductQuantity() {
    this.addQuantity++
  }

  subtractingProductQuantity() {
    this.addQuantity--
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }




}
