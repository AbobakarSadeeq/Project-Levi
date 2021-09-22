import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BrandService } from 'src/app/admin-panel/extra-product-info/brand/brand.service';
import { OperatingSystemService } from 'src/app/admin-panel/extra-product-info/operating-system/operating-system.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header-sidebar',
  templateUrl: './header-sidebar.component.html',
  styleUrls: ['./header-sidebar.component.css']
})
export class HeaderSidebarComponent implements OnInit {

  subscription: Subscription;
  operatingSystem: any[] = [];
  brand: any[] = [];

  userDetails: any;


  constructor(private _operatingSystemService: OperatingSystemService, private _brand: BrandService, private route: Router, private _AuthService: AuthService) { }

  ngOnInit(): void {



    this.subscription = this._AuthService.profileData.subscribe((data: any) => {
    });





    this.subscription = this._AuthService.GetLogInProfile().subscribe((data: any) => {
      this.userDetails = data;
    });


    this.subscription = this._brand.getBrands().subscribe((data: any) => {
      this.brand = data;
    });

    this.subscription = this._operatingSystemService.getOperatingSystem().subscribe((data: any) => {
      this.operatingSystem = data;
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
