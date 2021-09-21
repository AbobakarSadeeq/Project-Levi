import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileDetailComponent } from './mobile-detail.component';

const routes: Routes = [
  {path:"", component:MobileDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileDetailRoutingModule { }
