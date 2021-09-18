import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/Modules/shared.module';
import { HeaderSidebarComponent } from '../header-sidebar/header-sidebar.component';
import { HeaderSidebarModule } from '../header-sidebar/header-sidebar.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    HeaderSidebarModule,

  ]
})
export class HomeModule { }
