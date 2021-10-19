import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { SharedModule } from '../shared/Modules/shared.module';
import { AdminHeaderModule } from './admin-header/admin-header.module';
import { OperatingSystemComponent } from './extra-product-info/operating-system/operating-system.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [AdminPanelComponent, OperatingSystemComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    AdminHeaderModule,
    NgApexchartsModule
  ],
})
export class AdminModule { }
