import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserOrderDetailRoutingModule } from './user-order-detail-routing.module';
import { AdminHeaderModule } from 'src/app/admin-panel/admin-header/admin-header.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { UserOrderDetailComponent } from './user-order-detail.component';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [UserOrderDetailComponent],
  imports: [
    CommonModule,
    UserOrderDetailRoutingModule,
    AdminHeaderModule,
    SharedModule
  ],
  providers:[ConfirmationService]
})
export class UserOrderDetailModule { }
