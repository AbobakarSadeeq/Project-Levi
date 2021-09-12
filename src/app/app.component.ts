import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MobileService } from './admin-panel/product/mobile/mobile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'New Mobiles Delivery';
  /**
   *
   */
  constructor(private _router: Router, private _MobileService: MobileService) {

  }
  ngOnInit(): void {

  }





}




