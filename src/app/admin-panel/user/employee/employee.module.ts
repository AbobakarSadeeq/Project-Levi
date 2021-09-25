import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { AdminHeaderModule } from '../../admin-header/admin-header.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { ConfirmationService } from 'primeng/api';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';


@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    AdminHeaderModule,
    SharedModule
  ],
  providers:[ConfirmationService, DatePipe]
})
export class EmployeeModule { }
