import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MobileService } from 'src/app/admin-panel/product/mobile/mobile.service';

@Component({
  selector: 'app-client-mobile',
  templateUrl: './client-mobile.component.html',
  styleUrls: ['./client-mobile.component.css']
})

export class ClientMobileComponent implements OnInit {

  filterArray:any[] = [];
  subscription:Subscription;

  constructor(private _route: Router, private _activateRoute: ActivatedRoute, private _mobile:MobileService) {
    this._route.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit(): void {

    const findData = this._activateRoute.snapshot.params["multiData"];

    // Getting the All Mobiles by its brand.
    this.subscription = this._mobile.getAllMobile().subscribe((data:any[])=>{
     const filtered = data.filter(a=>a.brandId == findData);
      this.filterArray = filtered;
    });


    // Getting the All Mobiles by its Operating System.
    if(this._activateRoute.snapshot.queryParamMap.has("changeData")){
      this.subscription = this._mobile.getAllMobile().subscribe((data:any[])=>{
        const filtered = data.filter(a=>a.operatingSystemVersion?.operatingSystemId == findData);
         this.filterArray = filtered;
       });
    }

    // Getting the All Mobiles by its Mobile Screen Sizes.
    if(this._activateRoute.snapshot.queryParamMap.has("mobileSize")){
      this.subscription = this._mobile.getAllMobile().subscribe((data:any[])=>{
        const filtered = data.filter(a=>a.screenSize == findData);
        this.filterArray = filtered;
       });
    }


  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}

