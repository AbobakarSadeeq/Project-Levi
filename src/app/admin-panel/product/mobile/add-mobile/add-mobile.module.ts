import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddMobileRoutingModule } from './add-mobile-routing.module';
import { AddMobileComponent } from './add-mobile.component';
import { AdminHeaderModule } from 'src/app/admin-panel/admin-header/admin-header.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [AddMobileComponent],
  imports: [
    CommonModule,
    AddMobileRoutingModule,
    SharedModule,
    AdminHeaderModule
  ],
  providers:[]
})
export class AddMobileModule { }
