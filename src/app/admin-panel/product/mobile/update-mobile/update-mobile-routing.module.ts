import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateMobileComponent } from './update-mobile.component';

const routes: Routes = [
  {path:"", component:UpdateMobileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateMobileRoutingModule { }
