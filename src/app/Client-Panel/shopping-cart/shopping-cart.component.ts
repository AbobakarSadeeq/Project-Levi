import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, SubscriptionLike } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  // Shopping Cart Properties
  addQuantity = 0;


  // Other's Properties
  displayModal = false;
  subscription:SubscriptionLike;
  showIndicator = false;

  // User Address Data
  userDetails:any;
  userAddress:any = true;
  selectAddressTab = null;

  constructor(private _route:Router, private _activateRoute:ActivatedRoute, private _AuthService:AuthService) { }

  ngOnInit(): void {


  }

  // This will get the
  showModelDialog(){
    this.displayModal  = true;

    // Getting the Profile Data
    var gettingId:any;
      this.subscription = this._AuthService.GetLogInProfile().subscribe((data: any) => {
        this.userDetails = data;
        gettingId = data.id;
      });

    // Getting the User Address
    setTimeout(()=>{
      this.subscription = this._AuthService.GetUserAddress(gettingId).subscribe((data: any) => {
        if(data){
          this.userAddress = data;
        }else{
          this.userAddress = data;
        }
    });
  }, 1000)


  }


  goToAddressEdit(){
    this._route.navigate(['/User/EditUser/', this.userDetails?.id],{ queryParams: { selectAddressTab: 1 } });
  }

 // Order Confirm Method and it will send data to the API.
  orderConfirm(){
    this.showIndicator = true;
    setTimeout(()=>{
      this.showIndicator = false;
      this.displayModal = false;
    },3000)
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
    //this.subscription.unsubscribe();
  }




}
