import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  visibleSidebar1:any
  showDropDown = {firstDropDown:false, secondDropDown:false};

  constructor() { }

  ngOnInit(): void {
  }

}
