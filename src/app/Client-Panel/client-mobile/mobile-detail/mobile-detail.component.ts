import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MobileService } from 'src/app/admin-panel/product/mobile/mobile.service';
import { AuthService } from 'src/app/auth/auth.service';

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

  constructor(private _authService: AuthService, private _MobileService: MobileService, private _routeActivate: ActivatedRoute) { }

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
      debugger;
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


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }


}
