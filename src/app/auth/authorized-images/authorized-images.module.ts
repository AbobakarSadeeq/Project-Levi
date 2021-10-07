import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizedImagesRoutingModule } from './authorized-images-routing.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { HeaderSidebarModule } from 'src/app/Client-Panel/header-sidebar/header-sidebar.module';
import { AuthorizedImagesComponent } from './authorized-images.component';
import { ConfirmationService } from 'primeng/api';
import { UserAddressComponent } from '../user-address/user-address.component';
import { UserAddressModule } from '../user-address/user-address.module';


@NgModule({
  declarations: [AuthorizedImagesComponent],
  imports: [
    CommonModule,
    AuthorizedImagesRoutingModule,
    SharedModule,
    HeaderSidebarModule,
    UserAddressModule
  ],
  providers:[ConfirmationService]
})
export class AuthorizedImagesModule { }
