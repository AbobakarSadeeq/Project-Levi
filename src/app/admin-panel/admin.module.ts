import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { SharedModule } from '../shared/Modules/shared.module';
import { AdminHeaderModule } from './admin-header/admin-header.module';
import { MobileComponent } from './product/mobile/mobile.component';
import { AddMobileComponent } from './product/mobile/add-mobile/add-mobile.component';

@NgModule({
  declarations: [AdminPanelComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    AdminHeaderModule
  ]
})
export class AdminModule { }
