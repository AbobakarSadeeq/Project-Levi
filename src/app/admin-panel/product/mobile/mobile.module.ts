import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileRoutingModule } from './mobile-routing.module';
import { MobileComponent } from './mobile.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { AdminHeaderModule } from '../../admin-header/admin-header.module';


@NgModule({
  declarations: [MobileComponent],
  imports: [
    CommonModule,
    MobileRoutingModule,
    SharedModule,
    AdminHeaderModule
  ]
})
export class MobileModule { }
