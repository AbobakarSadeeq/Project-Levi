import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRoleRoutingModule } from './edit-role-routing.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { AdminHeaderModule } from '../../admin-header/admin-header.module';
import { EditRoleComponent } from './edit-role.component';
import { EditUserInRoleComponent } from './edit-user-in-role/edit-user-in-role.component';


@NgModule({
  declarations: [EditRoleComponent],
  imports: [
    CommonModule,
    EditRoleRoutingModule,
    SharedModule,
    AdminHeaderModule
  ]
})
export class EditRoleModule { }
