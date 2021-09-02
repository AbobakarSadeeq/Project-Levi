import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { AdminHeaderModule } from '../admin-header/admin-header.module';


@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    AdminHeaderModule
  ]
})
export class UserModule { }
