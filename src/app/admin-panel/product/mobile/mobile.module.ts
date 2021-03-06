import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileRoutingModule } from './mobile-routing.module';
import { MobileComponent } from './mobile.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { AdminHeaderModule } from '../../admin-header/admin-header.module';
import { ConfirmationService } from 'primeng/api';
import { DatePipe } from '@angular/common'
import { NgbPagination, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [MobileComponent],
  imports: [
    CommonModule,
    MobileRoutingModule,
    SharedModule,
    AdminHeaderModule,
    NgbPaginationModule
  ],
  providers:[ConfirmationService, DatePipe]
})
export class MobileModule { }
