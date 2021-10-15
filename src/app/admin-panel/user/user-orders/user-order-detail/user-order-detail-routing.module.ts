import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserOrderDetailComponent } from './user-order-detail.component';

const routes: Routes = [
  {path:"", component:UserOrderDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserOrderDetailRoutingModule { }
