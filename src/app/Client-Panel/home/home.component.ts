import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CarouselService } from 'src/app/admin-panel/extra-product-info/carousel/carousel.service';
import { MobileService } from 'src/app/admin-panel/product/mobile/mobile.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showIndicator = false;
  subscription:Subscription;
  CarouselAllData:any[] = [];
  MaxSellOutMobiles:any[] = [];

  constructor(private _authService:AuthService ,private _CarouselService:CarouselService, private _MobileService:MobileService) {


   }

  ngOnInit(): void {



    this.subscription =  this._authService.loadingSpinnerLogOut.subscribe((data:any)=>{
      this.showIndicator = data;
    });

    this.getAllCarousel();
    this.getTopSellOut();
  }

  getAllCarousel(){
    this.subscription =  this._CarouselService.getAllCarouselImages().subscribe((data:any)=>{
        this.CarouselAllData = data;
      });
    }

  getTopSellOut(){
    this.subscription = this._MobileService.GetMaxSellOut().subscribe((data:any)=>{
      this.MaxSellOutMobiles = data;
    })
  }

}
