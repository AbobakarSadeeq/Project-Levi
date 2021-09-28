import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BrandService } from 'src/app/admin-panel/extra-product-info/brand/brand.service';
import { OperatingSystemService } from 'src/app/admin-panel/extra-product-info/operating-system/operating-system.service';
import { MobileComponent } from 'src/app/admin-panel/product/mobile/mobile.component';
import { MobileService } from 'src/app/admin-panel/product/mobile/mobile.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header-sidebar',
  templateUrl: './header-sidebar.component.html',
  styleUrls: ['./header-sidebar.component.css']
})
export class HeaderSidebarComponent implements OnInit {

  // SideBar Data
  operatingSystem: any[] = [];
  operatingSystemFilter: any[] = [];
  brand: any[] = [];
  filterBrand:any[] = [];
  inchesBadges:any = {filterFiveInchesMobile:null,filterSixInchesMobile:null,filterSixEightInchesMobile:null  };


  subscription: Subscription;
  imageValue:any;
  userDetails: any;

  constructor(private _mobileService :MobileService, private _operatingSystemService: OperatingSystemService, private _brand: BrandService, private route: Router, private _AuthService: AuthService) { }

  ngOnInit(): void {



    this.subscription = this._AuthService.profileData.subscribe((data: any) => {
    });


    this._AuthService.profilePic.subscribe((data:any)=>{
      this.imageValue = data;
    });

    this.imageValue = localStorage.getItem("photoUrl");


    this.subscription = this._AuthService.GetLogInProfile().subscribe((data: any) => {
      this.userDetails = data;
    });






    // Filtering Siderbar and Badges
      this.subscription = this._mobileService.getAllMobile().subscribe((data:any[])=>{

        // Filtering Brand Data
        for(var singleBrandData of this.brand){
          let brandBadgesData = data.filter(a=>a.brandId == singleBrandData.brand_Id).length;
          this.filterBrand.push({brand_Id:singleBrandData.brand_Id, brandName:singleBrandData.brandName, brandBadges:brandBadgesData})
        }

        // Mobile Inches Filter
        this.inchesBadges.filterFiveInchesMobile = data.filter(a=>a.screenSize == "5.5").length;
        this.inchesBadges.filterSixInchesMobile = data.filter(a=>a.screenSize == "6.0").length;
        this.inchesBadges.filterSixEightInchesMobile = data.filter(a=>a.screenSize == "6.8").length;

        // Filtering Operating System Data
        for(var singleOperatingSystem of this.operatingSystem){
          let OSVBadgesData = data.filter(a=>a.operatingSystemVersion?.operatingSystemId == singleOperatingSystem.operatingSystem_Id).length;
          this.operatingSystemFilter.push({operatingSystem_Id:singleOperatingSystem?.operatingSystem_Id, operatingName:singleOperatingSystem.operatingName, OSBadges:OSVBadgesData})
        }
  });



  this.subscription = this._brand.getBrands().subscribe((brandData: any) => {
    this.brand = brandData;
  });


    this.subscription = this._operatingSystemService.getOperatingSystem().subscribe((operatingSystemData: any) => {
        this.operatingSystem = operatingSystemData;
    });

  }

  sendBrand(data: any) {
    this.route.navigate(['/Mobile', data])
  }


  loadingIndicator = false;
  isLogOut() {
    this.loadingIndicator = true;
    this._AuthService.loadingSpinnerLogOut.next(this.loadingIndicator);
    setTimeout(() => {
      this._AuthService.LogOut();
      this.loadingIndicator = false;
    }, 2500)
    localStorage.removeItem("photoUrl");
  }


  isLoggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
