import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { AdminHeaderModule } from '../../admin-header/admin-header.module';


@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    AdminHeaderModule
  ]
})
export class CategoryModule { }
