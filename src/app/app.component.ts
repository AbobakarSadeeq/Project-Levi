import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { delay } from 'rxjs/operators';
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
   loading: boolean;
  constructor(private _router: Router, private _MobileService: MobileService, private router: Router) {



  }
  ngOnInit(): void {

  }





}




