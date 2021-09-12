import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }


  // Navigation to Add mobile component:
  AddMobileNavigation(){
    this.route.navigate(["Admin/AddMobile"])
  }

}
