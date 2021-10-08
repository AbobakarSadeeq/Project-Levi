import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartComponent } from './shopping-cart.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { HeaderSidebarModule } from '../header-sidebar/header-sidebar.module';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [ShoppingCartComponent],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    SharedModule,
    HeaderSidebarModule
  ],
  providers:[ConfirmationService]
})
export class ShoppingCartModule { }
