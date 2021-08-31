import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { SharedModule } from '../shared/Modules/shared.module';

@NgModule({
  declarations: [ AdminPanelComponent, AdminHeaderComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
