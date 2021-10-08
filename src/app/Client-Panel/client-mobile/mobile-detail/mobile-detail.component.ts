import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MobileService } from 'src/app/admin-panel/product/mobile/mobile.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-mobile-detail',
  templateUrl: './mobile-detail.component.html',
  styleUrls: ['./mobile-detail.component.css']
})
export class MobileDetailComponent implements OnInit {

  subscription: Subscription;
  mobileDetailData: any

  addQuantity = 1;
  gettingInternetNetwork: any[] = [];
  showIndicator = false;

  // Cart Data
  itemsCart: any = [];


  constructor(private _shoppingCartService:ShoppingCartService,private _route:Router ,private _authService: AuthService, private _MobileService: MobileService, private _routeActivate: ActivatedRoute) { }

  ngOnInit(): void {

    this.subscription = this._authService.loadingSpinnerLogOut.subscribe((data: any) => {
      this.showIndicator = data;
    });


    const getUrlId = this._routeActivate.snapshot.params['id'];
    this.subscription = this._MobileService.getSingleMobile(getUrlId).subscribe((data: any) => {
      this.mobileDetailData = data;
    });

    setTimeout(() => {
      this.getInternetNetworks(this.mobileDetailData?.networksMobiles);
    }, 1000)
  }




  getInternetNetworks(mobileNetworksData: any) {
    this.gettingInternetNetwork.splice(0, this.gettingInternetNetwork.length);
    this._MobileService.getInternetNetwork().subscribe((data: any[]) => {
      for (var mobileNetworks in mobileNetworksData) {
        for (var networks in data) {
          if (mobileNetworksData[mobileNetworks].internetNetworkId == data[networks].internetNetwork_Id) {
            this.gettingInternetNetwork.push(data[networks]);
            break;
          }
        }
      }
    })
  }



  addingProductQuantity() {
    this.addQuantity++
  }

  subtractingProductQuantity() {
    this.addQuantity--
  }





  // Adding Product to cart


  cartNumberFunc() {
    var cartValue: [] = JSON.parse(localStorage.getItem('ProductCartData')!);
     let quantitySum:number = 0;
    for(var gettingQuantity of cartValue){
     quantitySum = quantitySum + gettingQuantity['quantity'];
    }
    this._shoppingCartService.cartItemsNumber.next(quantitySum);

 }


  // Products Array


  addToCartProduct(productData:any){

    // Making LocalStorage for Cart

    let filteringDataOfProduct = {
      mobileName: productData.mobileName,
      storage:productData.storage,
      color:productData.color.colorName,
      quantity : this.addQuantity,
      mobilePrice: productData.mobilePrice,
      imageUrl: productData.mobileImagess[0].url,
      mobileId:productData.mobile_Id,
    }


    let cartDataNull = localStorage.getItem("ProductCartData");
    if (cartDataNull == null) {
      let storeDataGet: any[] = [];
      storeDataGet.push(filteringDataOfProduct);
      localStorage.setItem("ProductCartData", JSON.stringify(storeDataGet));

    } else {
      let gettingIdOfProduct = filteringDataOfProduct.mobileId;
      let index = -1;
      this.itemsCart = JSON.parse(localStorage.getItem("ProductCartData")!);
      for (let i = 0; i < this.itemsCart.length; i++) {
        if (parseInt(gettingIdOfProduct) === parseInt(this.itemsCart[i].mobileId)) {
          this.itemsCart[i].quantity = filteringDataOfProduct.quantity;
          index = i;
          break;
        }
      }
      if (index == -1) {
        this.itemsCart.push(filteringDataOfProduct);
        localStorage.setItem("ProductCartData", JSON.stringify(this.itemsCart));

      }
      else {
        localStorage.setItem("ProductCartData", JSON.stringify(this.itemsCart));

      }
    }
    this.cartNumberFunc();


  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }


}
