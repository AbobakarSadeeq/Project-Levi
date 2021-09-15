import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UpdateMobileRoutingModule } from './update-mobile-routing.module';
import { UpdateMobileComponent } from './update-mobile.component';
import { AdminHeaderModule } from 'src/app/admin-panel/admin-header/admin-header.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [UpdateMobileComponent],
  imports: [
    CommonModule,
    UpdateMobileRoutingModule,
    SharedModule,
    AdminHeaderModule
  ],
  providers:[DatePipe, ConfirmationService]
})
export class UpdateMobileModule { }
