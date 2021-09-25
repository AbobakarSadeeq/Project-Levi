import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEmployeeRoutingModule } from './add-employee-routing.module';
import { AddEmployeeComponent } from './add-employee.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { AdminHeaderModule } from 'src/app/admin-panel/admin-header/admin-header.module';


@NgModule({
  declarations: [AddEmployeeComponent],
  imports: [
    CommonModule,
    AddEmployeeRoutingModule,
    SharedModule,
    AdminHeaderModule
  ]
})
export class AddEmployeeModule { }
