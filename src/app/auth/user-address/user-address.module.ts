import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAddressComponent } from './user-address.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';



@NgModule({
  declarations: [UserAddressComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[UserAddressComponent]
})
export class UserAddressModule { }
