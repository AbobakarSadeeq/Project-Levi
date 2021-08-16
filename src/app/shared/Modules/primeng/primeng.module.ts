import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';



@NgModule({
  declarations: [],
  imports: [
    CalendarModule,
    SliderModule,
    PaginatorModule,
    DialogModule,
    InputNumberModule,
    InputTextModule,
    OrderListModule,
    ButtonModule

  ],
  exports: [
    CalendarModule,
    SliderModule,
    PaginatorModule,
    DialogModule,
    InputNumberModule,
    InputTextModule,
    OrderListModule,
    ButtonModule



  ]
})
export class PrimengModule { }
