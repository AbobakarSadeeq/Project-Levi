import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription, SubscriptionLike } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  // Shopping Cart Properties
  addQuantity = 0;
  cartDataList: any[] = [];
  totalPrice: number = 0;
  numberOfItemsInCart: number = 0;


  // Other's Properties
  displayModal = false;
  subscription: SubscriptionLike;
  showIndicator = false;
  showCheckOutButton:boolean = true;

  // User Address Data
  userDetails: any;
  userAddress: any = true;
  selectAddressTab = null;

  constructor(private confirmationService: ConfirmationService,private _shoppingCartService: ShoppingCartService, private _route: Router, private _activateRoute: ActivatedRoute, private _AuthService: AuthService) { }

  ngOnInit(): void {

    // Used for when There is no Items inside the cart then dont show the CheckCart Button
    if(localStorage.getItem("ProductCartData") == null){
      this.showCheckOutButton = false;
    }

    // When user want to log-out then show spinner
    this.subscription =  this._AuthService.loadingSpinnerLogOut.subscribe((data:any)=>{
      this.showIndicator = data;
    });

    // Calling this method when this component execute
    this.gettingDataOfCart();
    this.allCartPrice();
  }

  // This will get the
  showModelDialogOfCheckOut() {
    this.showIndicator = true;
    if(localStorage.getItem("token") == null){
      this._route.navigate(["/auth"]);
    }

    // Getting the Profile Data because to Get the User Address
    var gettingId: any;
    this.subscription = this._AuthService.GetLogInProfile().subscribe((data: any) => {
      this.userDetails = data;
      gettingId = data.id;
    });

    // Getting the User Address
    setTimeout(() => {
    this.displayModal = true;
    this.showIndicator = false;
      this.subscription = this._AuthService.GetUserAddress(gettingId).subscribe((data: any) => {
        if (data) {
          this.userAddress = data;
        } else {
          this.userAddress = data;
        }
      });
    }, 1000)


  }

  // Order Confirm Method and it will send data to the API.



  // Adding the Product Quantity or change or Edit the Quantity
  addingProductQuantity(cartItemData: any) {
    for (var indexArray = 0; indexArray < this.cartDataList.length; indexArray++) {
      if (this.cartDataList[indexArray].mobileId == cartItemData.mobileId) {
        this.cartDataList[indexArray].quantity = parseInt(cartItemData.quantity) + 1;
      }
    }
    localStorage.setItem("ProductCartData", JSON.stringify(this.cartDataList));
    this.allCartPrice();
    this.cartItemFunc();
  }

  // Subtracting the Product Quantity or change or Edit the Quantity
  subtractingProductQuantity(cartItemData: any) {
    for (var indexArray = 0; indexArray < this.cartDataList.length; indexArray++) {
      if (this.cartDataList[indexArray].mobileId == cartItemData.mobileId) {
        this.cartDataList[indexArray].quantity = parseInt(cartItemData.quantity) - 1;
      }
    }
    localStorage.setItem("ProductCartData", JSON.stringify(this.cartDataList));
    this.allCartPrice();
    this.cartItemFunc();

  }

  // Geting All Shopping Cart LocalStorage Data
  gettingDataOfCart() {
    let gettingData = JSON.parse(localStorage.getItem("ProductCartData")!);
    if (gettingData) {
      this.cartDataList = gettingData;
    }
  }

  // Total Price of Items inside the Cart
  allCartPrice() {
    let gettingLocalStorageData = JSON.parse(localStorage.getItem("ProductCartData")!);
    if (gettingLocalStorageData) {
      this.cartDataList = gettingLocalStorageData
      this.totalPrice = 0;
      for (var cartItem of this.cartDataList) {
        this.totalPrice = this.totalPrice + (cartItem.quantity * cartItem.mobilePrice);
      }


    }
  }

  // Updating Number of Item in Cart
  cartItemFunc() {
    if (localStorage.getItem('ProductCartData') != null) {
      var cartValue: [] = JSON.parse(localStorage.getItem('ProductCartData')!);
      let quantitySum: number = 0;
      for (var gettingQuantity of cartValue) {
        quantitySum = quantitySum + gettingQuantity['quantity'];
      }
      this._shoppingCartService.cartItemsNumber.next(quantitySum);
    }
  }

  // Remove Item from Cart
  RemoveItemFromCart(MobileId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Delete the item from Cart?',
      accept: () => {
        let gettingData = JSON.parse(localStorage.getItem("ProductCartData")!);
        if (localStorage.getItem("ProductCartData")) {
          this.cartDataList = gettingData;
          const findingIdInCartArray = this.cartDataList.findIndex(a => a.mobileId == MobileId);
          this.cartDataList.splice(findingIdInCartArray, 1);
          localStorage.setItem("ProductCartData", JSON.stringify(this.cartDataList)); //when Data is deleted then again or replace or set that ArrayList all data in the LocalStorage
          this.allCartPrice();
        }
        if (this.cartDataList.length == 0) {
       this.showCheckOutButton = false;
          localStorage.removeItem("ProductCartData");
          this._shoppingCartService.cartItemsNumber.next(0);
        }else{
          this.cartItemFunc();
        }
      }
    });

  }


  // Sending User Order




  orderMessage:any = null;
  sendUserOrder(){
    this.showIndicator = true;
    let getDataFromOrderDetailLocalStorage = JSON.parse(localStorage.getItem("ProductCartData")!);
    let convertDataFromLocalStorage = getDataFromOrderDetailLocalStorage;
    let storeCustomOrderDetailData:any [] = [];
    for(let orderData of convertDataFromLocalStorage){
      storeCustomOrderDetailData.push(
        {
          mobile_Id:orderData?.mobileId,
          totalWithQuantityPrice: orderData.mobilePrice * orderData.quantity,
          quantity: orderData.quantity,
          productName: orderData.mobileName,
          // User Address
          userName: this.userDetails?.userName,
          userEmail: this.userDetails?.email,
          userAddress: this.userAddress?.completeAddress,
          mobileNumber: this.userAddress?.phoneNumber,

        }
      )
    }

    this.subscription = this._shoppingCartService.sendOrder(this.userDetails.id, storeCustomOrderDetailData).subscribe((data:any)=>{
      debugger;
      this.showIndicator = false;
      this.displayModal = false;
    //  this.orderMessage = data;
      localStorage.removeItem("ProductCartData");
      this._route.navigate(["/"]);
      this.showCheckOutButton = false;
    },(orderError:HttpErrorResponse)=>{
      console.log(orderError);
      this.orderMessage = orderError.error;
      this.showIndicator = false;
    });

  }

  removeMessage(){
    this.orderMessage = null;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    //this.subscription.unsubscribe();
  }




}
