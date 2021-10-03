import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  visibleSidebar1: any
  showDropDown = { firstDropDown: false, secondDropDown: false, thirdDropDown: false };
  imageValue:any;
  subscription: Subscription;
  userDetails: any;

  constructor(private _AuthService: AuthService) { }
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }

}
