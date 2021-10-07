import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/Modules/shared.module';
import { HeaderSidebarModule } from '../Client-Panel/header-sidebar/header-sidebar.module';
import { AuthComponent } from './auth.component';
import { AuthorizedImagesComponent } from './authorized-images/authorized-images.component';
import { UserAddressComponent } from './user-address/user-address.component';


@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    HeaderSidebarModule,

  ]
})
export class AuthModule { }
