import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderSidebarComponent } from './header-sidebar.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';


@NgModule({
  declarations: [HeaderSidebarComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[HeaderSidebarComponent]
})
export class HeaderSidebarModule { }
