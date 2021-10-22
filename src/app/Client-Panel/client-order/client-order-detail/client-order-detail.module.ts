import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientOrderDetailRoutingModule } from './client-order-detail-routing.module';
import { ClientOrderDetailComponent } from './client-order-detail.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { HeaderSidebarModule } from '../../header-sidebar/header-sidebar.module';


@NgModule({
  declarations: [ClientOrderDetailComponent],
  imports: [
    CommonModule,
    ClientOrderDetailRoutingModule,
    SharedModule,
    HeaderSidebarModule
  ]
})
export class ClientOrderDetailModule { }
