import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from './admin-header.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';



@NgModule({
  declarations: [AdminHeaderComponent],
  imports: [
    SharedModule,
    CommonModule
  ],
  exports: [AdminHeaderComponent]
})
export class AdminHeaderModule { }
