import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BrandService } from 'src/app/admin-panel/extra-product-info/brand/brand.service';
import { OperatingSystemService } from 'src/app/admin-panel/extra-product-info/operating-system/operating-system.service';

@Component({
  selector: 'app-header-sidebar',
  templateUrl: './header-sidebar.component.html',
  styleUrls: ['./header-sidebar.component.css']
})
export class HeaderSidebarComponent implements OnInit {

  subscription:Subscription;

  operatingSystem:any[]= [];
  brand:any[]= [];

  constructor(private _operatingSystemService:OperatingSystemService, private _brand:BrandService, private route:Router) { }

  ngOnInit(): void {


    this.subscription = this._brand.getBrands().subscribe((data:any)=>{
      this.brand = data;
    });

    this.subscription = this._operatingSystemService.getOperatingSystem().subscribe((data:any)=>{
    this.operatingSystem = data;
    });

  }

  sendBrand(data:any){
    this.route.navigate(['/Mobile',data])
  }

}
