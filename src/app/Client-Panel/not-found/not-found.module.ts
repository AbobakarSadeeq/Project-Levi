import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { HeaderSidebarModule } from '../header-sidebar/header-sidebar.module';
import { NotFoundComponent } from './not-found.component';




@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
     NotFoundRoutingModule,
     SharedModule,
     HeaderSidebarModule
  ]
})
export class NotFoundModule { }
