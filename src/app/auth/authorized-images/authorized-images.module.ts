import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizedImagesRoutingModule } from './authorized-images-routing.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { HeaderSidebarModule } from 'src/app/Client-Panel/header-sidebar/header-sidebar.module';
import { AuthorizedImagesComponent } from './authorized-images.component';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [AuthorizedImagesComponent],
  imports: [
    CommonModule,
    AuthorizedImagesRoutingModule,
    SharedModule,
    HeaderSidebarModule
  ],
  providers:[ConfirmationService]
})
export class AuthorizedImagesModule { }
