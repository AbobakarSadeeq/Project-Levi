import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UpdateEmployeeRoutingModule } from './update-employee-routing.module';
import { UpdateEmployeeComponent } from './update-employee.component';
import { AdminHeaderModule } from 'src/app/admin-panel/admin-header/admin-header.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';


@NgModule({
  declarations: [UpdateEmployeeComponent],
  imports: [
    CommonModule,
    UpdateEmployeeRoutingModule,
    SharedModule,
    AdminHeaderModule
  ],
  providers:[DatePipe]
})
export class UpdateEmployeeModule { }
