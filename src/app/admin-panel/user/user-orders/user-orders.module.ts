import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserOrdersRoutingModule } from './user-orders-routing.module';
import { UserOrdersComponent } from './user-orders.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { AdminHeaderModule } from '../../admin-header/admin-header.module';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [UserOrdersComponent],
  imports: [
    CommonModule,
    UserOrdersRoutingModule,
    SharedModule,
    AdminHeaderModule
  ],
  providers:[ConfirmationService]
})
export class UserOrdersModule { }
