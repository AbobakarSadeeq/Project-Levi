import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientOrderRoutingModule } from './client-order-routing.module';
import { HeaderSidebarModule } from '../header-sidebar/header-sidebar.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { ClientOrderComponent } from './client-order.component';
import { ConfirmationService } from 'primeng/api';
import { ClientOrderDetailComponent } from './client-order-detail/client-order-detail.component';


@NgModule({
  declarations: [ClientOrderComponent],
  imports: [
    CommonModule,
    ClientOrderRoutingModule,
    HeaderSidebarModule,
    SharedModule
  ],
  providers:[ConfirmationService]
})
export class ClientOrderModule { }
