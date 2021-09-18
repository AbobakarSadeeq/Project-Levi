import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileDetailRoutingModule } from './mobile-detail-routing.module';
import { MobileDetailComponent } from './mobile-detail.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { HeaderSidebarModule } from '../header-sidebar/header-sidebar.module';


@NgModule({
  declarations: [MobileDetailComponent],
  imports: [
    CommonModule,
    MobileDetailRoutingModule,
    SharedModule,
    HeaderSidebarModule,
  ]
})
export class MobileDetailModule { }
