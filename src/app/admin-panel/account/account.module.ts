import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { AdminHeaderModule } from '../admin-header/admin-header.module';



@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminHeaderModule
  ]
})
export class AccountModule { }
