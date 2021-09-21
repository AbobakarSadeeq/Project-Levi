import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientModuleRoutingModule } from './client-module-routing.module';
import { ClientMobileComponent } from './client-mobile.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { HeaderSidebarModule } from '../header-sidebar/header-sidebar.module';


@NgModule({
  declarations: [ClientMobileComponent],
  imports: [
    CommonModule,
    ClientModuleRoutingModule,
    SharedModule,
    HeaderSidebarModule
  ]
})
export class ClientModuleModule { }
